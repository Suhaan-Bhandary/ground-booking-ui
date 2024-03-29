import { IRegistration } from "../../types/event";
import Modal from "../Modal/Modal";

type PaymentDetailModalProps = {
  registration: IRegistration;
  closeModalCallback: () => void;
};

const PaymentDetailModal = ({
  registration,
  closeModalCallback,
}: PaymentDetailModalProps) => {
  return (
    <Modal>
      <h1>Payment Detail for slot {registration.slot_id}</h1>
      <div>
        <button type="button" onClick={closeModalCallback}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PaymentDetailModal;
