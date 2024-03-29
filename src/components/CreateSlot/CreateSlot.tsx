import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCreateSlotMutation } from "../../app/features/eventsApi";
import {
  isApiDataError,
  isApiErrorMessage,
  isApiResponse,
} from "../../helpers/api";
import {
  createSlotInitialValues,
  createSlotSchema,
  getTimeRangeFormat,
} from "../../helpers/slot";
import { ISlotCreateRequest } from "../../types/event";
import Modal from "../Modal/Modal";

const CreateSlot = () => {
  const { eventId } = useParams();

  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createSlot, createSlotResult] = useCreateSlotMutation();

  const { values, resetForm, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: createSlotInitialValues,
      validationSchema: createSlotSchema,
      onSubmit: async (values) => {
        try {
          const eventIdNumber = Number(eventId);
          if (Number.isNaN(eventIdNumber)) {
            toast.error("Invalid event Id");
            return;
          }

          const slot: ISlotCreateRequest = {
            status: "AVAILABLE",
            time_slot: getTimeRangeFormat(values.startTime, values.AM_PM),
          };

          await createSlot({ eventId: eventIdNumber, slot }).unwrap();

          resetForm();
          toast.success("Slot Created successfully");
          queryClient.invalidateQueries({ queryKey: ["admin-slots"] });
        } catch (error) {
          console.error("Rejected:", error);
          if (isApiResponse(error)) {
            error.data.errors.forEach((errMessage) => {
              toast.error(errMessage);
            });
          } else if (isApiErrorMessage(error)) {
            toast.error(error.data.message);
          } else if (isApiDataError(error)) {
            toast.error(error.data.error);
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
      <button onClick={openModal}>Create Slot</button>

      {isModalOpen && (
        <Modal>
          <h1>Create Slot</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="startTime">Start Time</label>
              <input
                name="startTime"
                type="number"
                min="1"
                max="12"
                value={values.startTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="AM_PM">AM/PM</label>
              <select
                name="AM_PM"
                value={values.AM_PM}
                onChange={(event) => setFieldValue("AM_PM", event.target.value)}
              >
                {["AM", "PM"].map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="button"
                onClick={closeModal}
                disabled={createSlotResult.isLoading}
              >
                Close
              </button>
              <button type="submit" disabled={createSlotResult.isLoading}>
                Create Slot
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateSlot;
