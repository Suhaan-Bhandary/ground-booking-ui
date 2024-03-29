import * as Yup from "yup";

export const eventStatusOptions = [
  {
    name: "Available",
    value: "AVAILABLE",
  },
  {
    name: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    name: "Booked",
    value: "BOOKED",
  },
] as const;

export const eventStatusDisplayName = {
  AVAILABLE: "Available",
  IN_PROGRESS: "In Progress",
  BOOKED: "Booked",
};

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

export const registrationStatusOptions = [
  {
    name: "Pending",
    value: "PENDING",
  },
  {
    name: "Confirmed",
    value: "CONFIRMED",
  },
  {
    name: "Canceled",
    value: "CANCELED",
  },
] as const;

export const registrationStatusDisplayName = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELED: "Canceled",
};
