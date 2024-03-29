import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateEventMutation } from "../../app/features/eventsApi";
import { isApiErrorMessage, isApiResponse } from "../../helpers/api";
import {
  createEventInitialValues,
  createEventSchema,
} from "../../helpers/event";
import { IEventCreateRequest } from "../../types/event";
import Modal from "../Modal/Modal";

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
          console.error("Rejected:", error);
          if (isApiResponse(error)) {
            error.data.errors.forEach((errMessage) => {
              toast.error(errMessage);
            });
          } else if (isApiErrorMessage(error)) {
            toast.error(error.data.message);
          } else {
            toast.error("Something went wrong");
          }
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
      <button onClick={openModal}>Create Event</button>

      {isModalOpen && (
        <Modal>
          <h1>Create Event</h1>
          <form onSubmit={handleSubmit}>
            <div>
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
            <div>
              <button
                type="button"
                onClick={closeModal}
                disabled={createEventResult.isLoading}
              >
                Close
              </button>
              <button type="submit" disabled={createEventResult.isLoading}>
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
