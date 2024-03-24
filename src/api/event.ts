import { API_BASE_URL } from "../constants/app";
import { getUserAuthToken } from "../helpers/authToken";
import { IEventPaginatedResponse } from "../types/event";

export const fetchEvents = async (page = 1, limit = 10) => {
  const url = `${API_BASE_URL}/events?page=${page}&limit=${limit}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getUserAuthToken()}` },
  });

  if (!response.ok) {
    return { events: [] } as IEventPaginatedResponse;
  }

  return response.json() as Promise<IEventPaginatedResponse>;
};
