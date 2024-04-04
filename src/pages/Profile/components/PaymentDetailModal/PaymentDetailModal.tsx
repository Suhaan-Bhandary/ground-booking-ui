import { useQuery } from "@tanstack/react-query";
import Moment from "moment";
import { fetchRegistrationPaymentDetail } from "../../../../api/payment";
import Modal from "../../../../components/Modal/Modal";
import { IRegistration } from "../../../../types/event";
import styles from "./PaymentDetailModal.module.css";

type PaymentDetailModalProps = {
  registration: IRegistration;
  closeModalCallback: () => void;
};

const PaymentDetailModal = ({
  registration,
  closeModalCallback,
}: PaymentDetailModalProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["payment", registration.id],
    queryFn: () => fetchRegistrationPaymentDetail(registration.id),
  });

  return (
    <Modal isDarkMode={true}>
      <h1>Payment Detail</h1>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className={styles.detail}>
          <p>Slot: {registration.slot_id}</p>
          <p>Amount: {data?.amount}</p>
          <p>
            Payment made on:{" "}
            {Moment(registration.created_at).format("DD/MM/YYYY")}
          </p>
        </div>
      )}

      {isError && (
        <p className="text-center">Error fetching registration Details</p>
      )}

      <div className={styles.buttons}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={closeModalCallback}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PaymentDetailModal;
