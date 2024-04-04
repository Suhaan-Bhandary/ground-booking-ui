import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { slotStatusDisplayName } from "../../helpers/slot";
import { useAppSelector } from "../../hooks/redux";
import useInfiniteQuerySlots from "../../hooks/useInfiniteQuerySlots";
import { ISlot } from "../../types/event";
import styles from "./Slots.module.css";
import RegisterSlotModal from "./components/RegisterSlotModal/RegisterSlotModal";
import SlotsSkeletonLoader from "./components/SlotsSkeletonLoader/SlotsSkeletonLoader";

const Slots = () => {
  const { eventId } = useParams();
  const userRole = useAppSelector((state) => state.userState.user?.role);

  const [slotSelectedForRegisteration, setSlotSelectedForRegisteration] =
    useState<ISlot | null>(null);

  const { slots, isLoading, isError, isFetchingNextPage, ref } =
    useInfiniteQuerySlots({ eventId: Number(eventId) });

  if (!isLoading && !isError && !slots?.length) {
    return <div className="text-center">No slots found!!</div>;
  }

  return (
    <div className={`container ${styles.SlotsContainer}`}>
      <h1>Slots</h1>
      <div className={styles.slots}>
        {slots?.map((slot, index) => {
          const slotTypeClassName =
            slot.status === "AVAILABLE"
              ? styles.slotAvailable
              : styles.slotBooked;

          // Conditionally adding ref
          const refProp = index === slots.length - 1 ? { ref: ref } : {};
          return (
            <div key={slot.id} className={styles.slot} {...refProp}>
              <p>Time: {slot.time_slot}</p>
              <p>
                Status:{" "}
                <span className={slotTypeClassName}>
                  {slotStatusDisplayName[slot.status]}
                </span>
              </p>
              {slot.status === "AVAILABLE" ? (
                userRole ? (
                  <button
                    className={styles.registerSlotButton}
                    onClick={() => setSlotSelectedForRegisteration(slot)}
                  >
                    Book
                  </button>
                ) : (
                  <Link className={styles.registerSlotButton} to="/login">
                    Login to Book
                  </Link>
                )
              ) : null}
            </div>
          );
        })}

        {isLoading ? <SlotsSkeletonLoader slotCount={6} /> : null}

        {isError && <p className="text-center">Error loading slots</p>}
        {isFetchingNextPage && <p className="text-center">Fetching slots...</p>}
      </div>

      {slotSelectedForRegisteration ? (
        <RegisterSlotModal
          slot={slotSelectedForRegisteration}
          closeModalCallback={() => setSlotSelectedForRegisteration(null)}
        />
      ) : null}
    </div>
  );
};

export default Slots;
