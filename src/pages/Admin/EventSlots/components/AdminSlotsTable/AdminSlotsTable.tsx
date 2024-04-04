import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";
import styles from "./AdminSlotsTable.module.css";
import { fetchSlots } from "../../../../../api/slot";
import Table from "../../../../../components/Table/Table";
import DeleteSlotModal from "../DeleteSlotModal/DeleteSlotModal";
import { slotStatusDisplayName } from "../../../../../helpers/slot";
import { ISlot } from "../../../../../types/event";

const AdminSlotsTable = () => {
  const { eventId } = useParams();

  const [deleteSlotModalData, setDeleteSlotModalData] = useState<ISlot | null>(
    null,
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["slots", eventId],
    queryFn: ({ pageParam }) => {
      return fetchSlots({
        page: pageParam,
        event_id: Number(eventId),
      });
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1 <= lastPage.total_pages
        ? allPages.length + 1
        : undefined;
    },
  });

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  // Making the data flat
  const slots = data?.pages.flatMap((page) => page.slots);

  if (!isError && !slots?.length) {
    return <div className="text-center">No slots found!!</div>;
  }

  return (
    <div className={styles.AdminSlotsTable}>
      {slots && slots.length !== 0 && (
        <Table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {slots.map((slot, index) => {
              // Conditionally adding ref
              const refProp = index === slots.length - 1 ? { ref: ref } : {};
              return (
                <tr key={slot.id} {...refProp}>
                  <td>{slot.time_slot}</td>
                  <td>{slotStatusDisplayName[slot.status]}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        className={styles.viewLink}
                        to={`/registrations?slot_id=${slot.id}`}
                      >
                        <IoListOutline />
                      </Link>

                      <CiSquareRemove
                        className={styles.deleteIcon}
                        onClick={() => setDeleteSlotModalData(slot)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {isError && <p className="text-center">Error loading slots</p>}
      {isFetchingNextPage && <p className="text-center">Fetching slots...</p>}

      {/* Modals */}
      {deleteSlotModalData ? (
        <DeleteSlotModal
          slot={deleteSlotModalData}
          closeModalCallback={() => setDeleteSlotModalData(null)}
        />
      ) : null}
    </div>
  );
};

export default AdminSlotsTable;
