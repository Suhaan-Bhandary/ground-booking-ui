import * as Yup from "yup";

export const createEventInitialValues = {
  date: new Date(),
};

export const createEventSchema = Yup.object({
  date: Yup.date()
    .typeError("Event date is required")
    .required("Event date is required")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Event cannot before current date",
    ),
});
