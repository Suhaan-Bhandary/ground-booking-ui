import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteSlotMutation } from "../../app/features/eventsApi";
import { isApiErrorMessage } from "../../helpers/api";
import { ISlot } from "../../types/event";
import Modal from "../Modal/Modal";
import styles from "./DeleteSlotModal.module.css";

type DeleteSlotProps = {
  slot: ISlot;
  closeModalCallback: () => void;
};

const DeleteSlotModal = ({ slot, closeModalCallback }: DeleteSlotProps) => {
  const queryClient = useQueryClient();
  const [deleteSlot, deleteSlotResult] = useDeleteSlotMutation();

  const handleSlotDelete = async () => {
    try {
      await deleteSlot({
        eventId: slot.event_id,
        slotId: slot.id,
      }).unwrap();

      toast.success("Slot Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["slots"] });

      closeModalCallback();
    } catch (error) {
      console.error("Rejected:", error);
      if (isApiErrorMessage(error)) {
        toast.error(error.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Modal isDarkMode={false}>
      <h1>Delete Slot</h1>
      <p>
        Delete the slot of {slot.time_slot} with status {slot.status} for the
        event {slot.event_id}
      </p>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.closeButton}`}
          onClick={closeModalCallback}
          disabled={deleteSlotResult.isLoading}
        >
          Close
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleSlotDelete}
          disabled={deleteSlotResult.isLoading}
        >
          Delete Slot
        </button>
      </div>
    </Modal>
  );
};

export default DeleteSlotModal;
