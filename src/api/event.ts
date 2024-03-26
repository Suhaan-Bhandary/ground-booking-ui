import { API_BASE_URL } from "../constants/app";
import { getUserAuthToken } from "../helpers/authToken";
import { IEventPaginatedResponse } from "../types/event";

export const fetchEvents = async ({ page = 1, eventStatus = "" }) => {
  const url = new URL(`${API_BASE_URL}/events`);

  url.searchParams.set("page", String(page));
  if (eventStatus) {
    url.searchParams.set("event_status", eventStatus);
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getUserAuthToken()}` },
  });

  if (!response.ok) {
    throw Error("Something went wrong");
  }

  return response.json() as Promise<IEventPaginatedResponse>;
};
