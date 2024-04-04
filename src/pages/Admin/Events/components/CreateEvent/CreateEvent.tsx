import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateEventMutation } from "../../../../../app/features/eventsApi";
import Modal from "../../../../../components/Modal/Modal";
import { getErrorFromApiResponse } from "../../../../../helpers/api";
import {
  createEventInitialValues,
  createEventSchema,
} from "../../../../../helpers/event";
import { IEventCreateRequest } from "../../../../../types/event";
import styles from "./CreateEvent.module.css";

const CreateEvent = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createEvent, createEventResult] = useCreateEventMutation();

  const { values, errors, touched, resetForm, handleChange, handleSubmit } =
    useFormik({
      initialValues: createEventInitialValues,
      validationSchema: createEventSchema,
      onSubmit: async (values) => {
        try {
          const body: IEventCreateRequest = {
            event_status: "AVAILABLE",
            date: values.date,
          };

          await createEvent(body).unwrap();

          resetForm();
          toast.success("Event Created successfully");
          queryClient.invalidateQueries({ queryKey: ["events"] });
        } catch (error) {
          console.error("Create Event:", error);
          const errors = getErrorFromApiResponse(error);
          errors.forEach((errMessage) => toast.error(errMessage));
        }
      },
    });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className={styles.createEventButton}>
        Create Event
      </button>

      {isModalOpen && (
        <Modal isDarkMode={false}>
          <h1>Create Event</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <label htmlFor="date">Event Date</label>
              <input
                name="date"
                type="date"
                value={Moment(values.date).format("YYYY-MM-DD")}
                onChange={handleChange}
              />
              {touched.date && errors.date ? (
                <span className="error">{String(errors.date)}</span>
              ) : null}
            </div>
            <div className={styles.buttons}>
              <button
                type="button"
                className={`${styles.button} ${styles.closeButton}`}
                onClick={closeModal}
                disabled={createEventResult.isLoading}
              >
                Close
              </button>
              <button
                className={`${styles.button} ${styles.createEventButtonModal}`}
                type="submit"
                disabled={createEventResult.isLoading}
              >
                Create Event
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateEvent;
