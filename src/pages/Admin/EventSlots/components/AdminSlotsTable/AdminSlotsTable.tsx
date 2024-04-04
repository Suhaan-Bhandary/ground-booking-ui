import { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Table from "../../../../../components/Table/Table";
import { slotStatusDisplayName } from "../../../../../helpers/slot";
import { ISlot } from "../../../../../types/event";
import DeleteSlotModal from "../DeleteSlotModal/DeleteSlotModal";
import styles from "./AdminSlotsTable.module.css";
import useInfiniteQuerySlots from "../../../../../hooks/useInfiniteQuerySlots";

const AdminSlotsTable = () => {
  const { eventId } = useParams();

  const [deleteSlotModalData, setDeleteSlotModalData] = useState<ISlot | null>(
    null,
  );

  const { slots, isLoading, isError, isFetchingNextPage, ref } =
    useInfiniteQuerySlots({ eventId: Number(eventId) });

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

      {isLoading ? <div className="text-center">Loading...</div> : null}
      {!isLoading && !isError && !slots?.length ? (
        <div className="text-center">No slots found!!</div>
      ) : null}
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
