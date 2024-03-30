import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePaymentMutation } from "../../app/features/registrationApi";
import { isApiErrorMessage } from "../../helpers/api";
import { IRegistration } from "../../types/event";
import Modal from "../Modal/Modal";
import styles from "./PaymentModal.module.css";

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
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.closeButton}`}
          onClick={closeModalCallback}
          disabled={doPaymentResult.isLoading}
        >
          Close
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.payButton}`}
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
