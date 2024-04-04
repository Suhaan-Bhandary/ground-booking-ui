import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import styles from "./DeleteEventModal.module.css";
import { IEvent } from "../../../../../types/event";
import { useDeleteEventMutation } from "../../../../../app/features/eventsApi";
import { getErrorFromApiResponse } from "../../../../../helpers/api";
import Modal from "../../../../../components/Modal/Modal";

type DeleteEventProps = {
  event: IEvent;
  closeModalCallback: () => void;
};

const DeleteEventModal = ({ event, closeModalCallback }: DeleteEventProps) => {
  const queryClient = useQueryClient();
  const [deleteEvent, deleteEventResult] = useDeleteEventMutation();

  const handleEventDelete = async () => {
    try {
      await deleteEvent(event.id).unwrap();
      toast.success("Event Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });

      closeModalCallback();
    } catch (error) {
      console.error("Delete Event:", error);
      const errors = getErrorFromApiResponse(error);
      errors.forEach((errMessage) => toast.error(errMessage));
    }
  };

  return (
    <Modal isDarkMode={false}>
      <h1>Delete Event</h1>
      <p>
        Delete the event on {event.date} with status {event.event_status}
      </p>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.closeButton}`}
          onClick={closeModalCallback}
          disabled={deleteEventResult.isLoading}
        >
          Close
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleEventDelete}
          disabled={deleteEventResult.isLoading}
        >
          Delete Event
        </button>
      </div>
    </Modal>
  );
};

export default DeleteEventModal;
