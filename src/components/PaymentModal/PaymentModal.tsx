import toast from "react-hot-toast";
import { IRegistration } from "../../types/event";
import Modal from "../Modal/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { isApiErrorMessage } from "../../helpers/api";
import { usePaymentMutation } from "../../app/features/registrationApi";

const AMOUNT_DEDUCTED_FROM_USER = 1000;

type PaymentModalProps = {
  registration: IRegistration;
  closeModalCallback: () => void;
};

const PaymentModal = ({
  registration,
  closeModalCallback,
}: PaymentModalProps) => {
  const queryClient = useQueryClient();
  const [doPayment, doPaymentResult] = usePaymentMutation();

  const handlePayment = async () => {
    try {
      await doPayment({
        registrationId: registration.id,
        amount: AMOUNT_DEDUCTED_FROM_USER,
      }).unwrap();

      toast.success("Payment done Successfully");
      queryClient.invalidateQueries({ queryKey: ["profile-registerations"] });

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
      <h1>Payment for slot {registration.slot_id}</h1>
      <div>
        <button
          type="button"
          onClick={closeModalCallback}
          disabled={doPaymentResult.isLoading}
        >
          Close
        </button>
        <button
          type="button"
          onClick={handlePayment}
          disabled={doPaymentResult.isLoading}
        >
          Pay
        </button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
