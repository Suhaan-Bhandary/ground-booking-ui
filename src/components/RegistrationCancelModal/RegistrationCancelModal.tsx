import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteRegistrationMutation } from "../../app/features/registrationApi";
import { isApiErrorMessage } from "../../helpers/api";
import { IRegistration } from "../../types/event";
import Modal from "../Modal/Modal";
import styles from "./RegistrationCancelModal.module.css";

type RegistrationCancelModalProps = {
  registration: IRegistration;
  closeModalCallback: () => void;
};

const RegistrationCancelModal = ({
  registration,
  closeModalCallback,
}: RegistrationCancelModalProps) => {
  const queryClient = useQueryClient();
  const [deleteRegistration, deleteRegistrationResult] =
    useDeleteRegistrationMutation();

  const handleDeleteRegistration = async () => {
    try {
      await deleteRegistration({ registrationId: registration.id }).unwrap();

      toast.success("Registration Deleted Successfully");
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
      <h1>Cancel Registration</h1>
      <p>
        Are you sure you want to cancel registration for slot{" "}
        {registration.slot_id}?
      </p>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.closeButton}`}
          onClick={closeModalCallback}
          disabled={deleteRegistrationResult.isLoading}
        >
          Close
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleDeleteRegistration}
          disabled={deleteRegistrationResult.isLoading}
        >
          Cancel Registration
        </button>
      </div>
    </Modal>
  );
};

export default RegistrationCancelModal;
