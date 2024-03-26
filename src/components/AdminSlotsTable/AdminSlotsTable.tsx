import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";
import { fetchSlots } from "../../api/slot";
import { slotStatusDisplayName } from "../../helpers/slot";
import { ISlot } from "../../types/event";
import DeleteSlotModal from "../DeleteSlotModal/DeleteSlotModal";
import Table from "../Table/Table";
import styles from "./AdminSlotsTable.module.css";

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
    queryKey: ["admin-slots", eventId],
    queryFn: ({ pageParam }) => {
      return fetchSlots({
        page: pageParam,
        event_id: Number(eventId),
      });
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.slots.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Making the data flat
  const slots = data?.pages.flatMap((page) => page.slots);

  if (!isError && !slots?.length) {
    return <div>No slots found!!</div>;
  }

  return (
    <div className={styles.AdminSlotsTable}>
      {slots && slots.length !== 0 && (
        <Table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Status</th>
              <th>Registrations</th>
              <th>Delete</th>
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
                    <Link to={`/`}>View</Link>
                  </td>
                  <td>
                    <button onClick={() => setDeleteSlotModalData(slot)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {isError && <p>Error loading slots</p>}
      {isFetchingNextPage && <p>Fetching slots...</p>}

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
