import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteEventMutation } from "../../app/features/eventsApi";
import { isApiErrorMessage } from "../../helpers/api";
import { IEvent } from "../../types/event";
import Modal from "../Modal/Modal";

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
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });

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
    <Modal>
      <h1>Delete Event</h1>
      <p>
        Delete the event on {event.date} with status {event.event_status}
      </p>
      <div>
        <button
          type="button"
          onClick={closeModalCallback}
          disabled={deleteEventResult.isLoading}
        >
          Close
        </button>
        <button
          type="button"
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
