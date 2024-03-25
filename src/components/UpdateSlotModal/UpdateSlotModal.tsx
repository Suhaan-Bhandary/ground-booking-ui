import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateSlotMutation } from "../../app/features/eventsApi";
import { isApiErrorMessage } from "../../helpers/api";
import { slotStatusOptions } from "../../helpers/slot";
import { ISlot, TSlotStatus } from "../../types/event";
import Modal from "../Modal/Modal";

type UpdateSlotProps = {
  slot: ISlot;
  closeModalCallback: () => void;
};

const UpdateSlotModal = ({ slot, closeModalCallback }: UpdateSlotProps) => {
  const queryClient = useQueryClient();
  const [slotStatus, setSlotStatus] = useState(slot.status);
  const [updateSlot, updateSlotResult] = useUpdateSlotMutation();

  const handleSlotUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateSlot({
        slotId: slot.id,
        eventId: slot.event_id,
        slotStatus: slotStatus,
      }).unwrap();

      toast.success("Slot Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-slots"] });

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
      <h1>Update Slot</h1>

      <form onSubmit={handleSlotUpdate}>
        <div>
          <label htmlFor="slot_status">Slot Status</label>
          <select
            name="slot_status"
            value={slotStatus}
            onChange={(event) =>
              setSlotStatus(event.target.value as TSlotStatus)
            }
          >
            {slotStatusOptions.map((option) => (
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
            disabled={updateSlotResult.isLoading}
          >
            Close
          </button>
          <button type="submit" disabled={updateSlotResult.isLoading}>
            Update Slot
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateSlotModal;
