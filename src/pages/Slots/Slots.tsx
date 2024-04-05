import { useState } from "react";
import { useParams } from "react-router-dom";
import useInfiniteQuerySlots from "../../hooks/useInfiniteQuerySlots";
import { ISlot } from "../../types/event";
import styles from "./Slots.module.css";
import RegisterSlotModal from "./components/RegisterSlotModal/RegisterSlotModal";
import SlotCard from "./components/SlotCard/SlotCard";
import SlotsSkeletonLoader from "./components/SlotsSkeletonLoader/SlotsSkeletonLoader";

const Slots = () => {
  const { eventId } = useParams();

  const [slotSelectedForRegisteration, setSlotSelectedForRegisteration] =
    useState<ISlot | null>(null);

  const { slots, isLoading, isError, isFetchingNextPage, ref } =
    useInfiniteQuerySlots({ eventId: Number(eventId) });

  return (
    <div className={`container ${styles.SlotsContainer}`}>
      <h1>Slots</h1>
      <div className={styles.slots}>
        {slots?.map((slot, index) => (
          <SlotCard
            slot={slot}
            viewRef={index === slots.length - 1 ? ref : null}
            handleSlotRegistrationCallback={() =>
              setSlotSelectedForRegisteration(slot)
            }
          />
        ))}

        {!isLoading && !isError && !slots?.length && (
          <div className="text-center">No slots found!!</div>
        )}
        {isLoading && <SlotsSkeletonLoader slotCount={6} />}
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
