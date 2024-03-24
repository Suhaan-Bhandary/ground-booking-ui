import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateEventMutation } from "../../app/features/eventsApi";
import { isApiErrorMessage } from "../../helpers/api";
import { eventStatusOptions } from "../../helpers/event";
import { IEvent, TEventStatus } from "../../types/event";
import Modal from "../Modal/Modal";

type UpdateEventProps = {
  event: IEvent;
  closeModalCallback: () => void;
};

const UpdateEventModal = ({ event, closeModalCallback }: UpdateEventProps) => {
  const queryClient = useQueryClient();
  const [eventStatus, setEventStatus] = useState(event.event_status);
  const [updateEvent, updateEventResult] = useUpdateEventMutation();

  const handleEventUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateEvent({
        id: event.id,
        event_status: eventStatus,
      }).unwrap();

      toast.success("Event Updated Successfully");
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
      <h1>Update Event</h1>

      <form onSubmit={handleEventUpdate}>
        <div>
          <label htmlFor="event_status">Event Status</label>
          <select
            name="event_status"
            value={eventStatus}
            onChange={(event) =>
              setEventStatus(event.target.value as TEventStatus)
            }
          >
            {eventStatusOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={closeModalCallback}
            disabled={updateEventResult.isLoading}
          >
            Close
          </button>
          <button type="submit" disabled={updateEventResult.isLoading}>
            Update Event
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateEventModal;
