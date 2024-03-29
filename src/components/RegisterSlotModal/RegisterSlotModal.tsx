import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRegisterSlotMutation } from "../../app/features/eventsApi";
import { isApiErrorMessage } from "../../helpers/api";
import { ISlot } from "../../types/event";
import Modal from "../Modal/Modal";

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
      <h1>
        Register Slot: {slot.time_slot} of event {slot.event_id}
      </h1>
      <div>
        <button
          type="button"
          onClick={closeModalCallback}
          disabled={registerSlotResult.isLoading}
        >
          Close
        </button>
        <button
          type="button"
          onClick={handleRegisterSlot}
          disabled={registerSlotResult.isLoading}
        >
          Register Slot
        </button>
      </div>
    </Modal>
  );
};

export default RegisterSlotModal;
