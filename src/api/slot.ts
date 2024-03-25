import { API_BASE_URL } from "../constants/app";
import { getUserAuthToken } from "../helpers/authToken";
import { ISlotPaginatedResponse } from "../types/event";

type fetchSlotsParams = {
  event_id: number | undefined;
  page?: number;
  limit?: number;
};

export const fetchSlots = async ({
  event_id,
  page = 1,
  limit = 10,
}: fetchSlotsParams) => {
  if (Number.isNaN(event_id)) {
    throw Error("Event id undefined");
  }

  const url = new URL(`${API_BASE_URL}/events/${event_id}/slots`);

  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getUserAuthToken()}` },
  });

  if (!response.ok) {
    if (response.status !== 400) throw Error("Something went wrong");
    return { slots: [] } as ISlotPaginatedResponse;
  }

  return response.json() as Promise<ISlotPaginatedResponse>;
};
