import { IRegistration } from "../../types/event";
import Modal from "../Modal/Modal";

type PaymentModalProps = {
  registration: IRegistration;
  closeModalCallback: () => void;
};

const PaymentModal = ({
  registration,
  closeModalCallback,
}: PaymentModalProps) => {
  const handlePayment = () => {};

  return (
    <Modal>
      <h1>Payment for slot {registration.slot_id}</h1>
      <div>
        <button type="button" onClick={closeModalCallback}>
          Close
        </button>
        <button type="button" onClick={handlePayment}>
          Pay
        </button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
