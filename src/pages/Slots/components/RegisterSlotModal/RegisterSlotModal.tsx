import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRegisterSlotMutation } from "../../../../app/features/eventsApi";
import Modal from "../../../../components/Modal/Modal";
import { getErrorFromApiResponse } from "../../../../helpers/api";
import { ISlot } from "../../../../types/event";
import styles from "./RegisterSlotModal.module.css";

type RegisterSlotModalProps = {
  slot: ISlot;
  closeModalCallback: () => void;
};

const RegisterSlotModal = ({
  slot,
  closeModalCallback,
}: RegisterSlotModalProps) => {
  const queryClient = useQueryClient();
  const [registerSlot, registerSlotResult] = useRegisterSlotMutation();

  const handleRegisterSlot = async () => {
    try {
      await registerSlot({
        eventId: slot.event_id,
        slotId: slot.id,
      });

      toast.success("Slot registered Successfully");
      queryClient.invalidateQueries({ queryKey: ["slots"] });

      closeModalCallback();
    } catch (error) {
      console.error("Register Slot:", error);
      const errors = getErrorFromApiResponse(error);
      errors.forEach((errMessage) => toast.error(errMessage));
    }
  };

  return (
    <Modal>
      <div className={styles.content}>
        <h1>Register Slot</h1>
        <p>
          Register a slot of {slot.time_slot} for event with id {slot.event_id}
        </p>
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.closeButton}`}
          onClick={closeModalCallback}
          disabled={registerSlotResult.isLoading}
        >
          Close
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.registerButton}`}
          onClick={handleRegisterSlot}
          disabled={registerSlotResult.isLoading}
        >
          Register
        </button>
      </div>
    </Modal>
  );
};

export default RegisterSlotModal;
