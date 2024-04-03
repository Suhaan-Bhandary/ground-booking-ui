import { API_BASE_URL } from "../constants/app";
import { getUserAuthToken } from "../helpers/authToken";
import {
  IEventPaginatedResponse,
  IRegistrationPaginatedResponse,
  IUserRegistrationPaginatedResponse,
} from "../types/event";

export const fetchEvents = async ({
  page = 1,
  eventStatus = "",
  startDate = "",
  endDate = "",
}) => {
  const url = new URL(`${API_BASE_URL}/events`);

  url.searchParams.set("page", String(page));
  if (eventStatus) {
    url.searchParams.set("event_status", eventStatus);
  }
  if (startDate) {
    url.searchParams.set("start_date", startDate);
  }
  if (endDate) {
    url.searchParams.set("end_date", endDate);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw Error("Something went wrong");
  }

  return response.json() as Promise<IEventPaginatedResponse>;
};

export const fetchRegisterations = async ({
  page = 1,
  user_id = "",
  slot_id = "",
  status = "",
}) => {
  const url = new URL(`${API_BASE_URL}/registrations`);

  url.searchParams.set("page", String(page));
  if (user_id) url.searchParams.set("user_id", user_id);
  if (slot_id) url.searchParams.set("slot_id", slot_id);
  if (status) url.searchParams.set("status", status);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getUserAuthToken()}` },
  });

  if (!response.ok) {
    if (response.status !== 404) {
      throw Error("Something went wrong");
    }

    return {
      registrations: [],
      total_pages: 1,
      total_records: 0,
    } as IRegistrationPaginatedResponse;
  }

  return response.json() as Promise<IRegistrationPaginatedResponse>;
};

export const fetchUserRegisterations = async ({ page = 1 }) => {
  const url = new URL(`${API_BASE_URL}/user/registrations`);
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getUserAuthToken()}` },
  });

  if (!response.ok) {
    if (response.status !== 404) {
      throw Error("Something went wrong");
    }

    return {
      users: [],
      total_pages: 1,
      total_records: 0,
    } as IUserRegistrationPaginatedResponse;
  }

  return response.json() as Promise<IUserRegistrationPaginatedResponse>;
};
