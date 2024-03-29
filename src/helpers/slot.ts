import * as Yup from "yup";

export const slotStatusOptions = [
  {
    name: "Available",
    value: "AVAILABLE",
  },
  {
    name: "Booked",
    value: "BOOKED",
  },
] as const;

export const slotStatusDisplayName = {
  AVAILABLE: "Available",
  BOOKED: "Booked",
};

export const createSlotInitialValues = {
  startTime: 1,
  AM_PM: "AM",
};

export const createSlotSchema = Yup.object({
  startTime: Yup.number().required("Start time is required").min(1).max(12),
  AM_PM: Yup.string().required("Choose AM or PM"),
});

export const getTimeRangeFormat = (
  startTime: number,
  startAM_PM: string,
): string => {
  const endTime = (startTime % 12) + 1;

  let endAM_PM = startAM_PM;
  if (endTime < startTime) {
    endAM_PM = startAM_PM === "AM" ? "PM" : "AM";
  }

  return `${startTime}${startAM_PM}-${endTime}${endAM_PM}`;
};
