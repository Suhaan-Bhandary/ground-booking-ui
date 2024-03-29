import { useQuery } from "@tanstack/react-query";
import { IRegistration } from "../../types/event";
import Modal from "../Modal/Modal";
import { fetchRegistrationPaymentDetail } from "../../api/payment";

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
    <Modal>
      <h1>Payment Detail for slot {registration.slot_id}</h1>
      <p>Amount: {data?.amount}</p>
      <p>Payment made on: {data?.created_at}</p>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching registration Details</p>}

      <div>
        <button type="button" onClick={closeModalCallback}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PaymentDetailModal;
