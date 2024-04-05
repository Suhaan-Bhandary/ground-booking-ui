import { Link } from "react-router-dom";
import { slotStatusDisplayName } from "../../../../helpers/slot";
import { useAppSelector } from "../../../../hooks/redux";
import { ISlot } from "../../../../types/event";
import styles from "./SlotCard.module.css";

type SlotCardProps = {
  slot: ISlot;
  handleSlotRegistrationCallback: () => void;
  viewRef: ((node?: Element | null | undefined) => void) | null;
};

const SlotCard = ({
  slot,
  handleSlotRegistrationCallback,
  viewRef,
}: SlotCardProps) => {
  const userRole = useAppSelector((state) => state.userState.user?.role);

  const slotTypeClassName =
    slot.status === "AVAILABLE" ? styles.slotAvailable : styles.slotBooked;

  return (
    <div key={slot.id} className={styles.slot} ref={viewRef}>
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
            onClick={handleSlotRegistrationCallback}
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
};

export default SlotCard;
