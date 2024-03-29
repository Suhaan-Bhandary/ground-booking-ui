import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/app";
import { getUserAuthToken } from "../../helpers/authToken";
import {
  IEventCreateRequest,
  IEventCreateResponse,
  ISlotCreateRequest,
  ISlotCreateResponse,
} from "../../types/event";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/events`,
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    // First is the return type and second is the Body
    createEvent: builder.mutation<IEventCreateResponse, IEventCreateRequest>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${getUserAuthToken()}` },
      }),
    }),

    deleteEvent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${getUserAuthToken()}` },
      }),
    }),

    createSlot: builder.mutation<
      ISlotCreateResponse,
      { eventId: number; slot: ISlotCreateRequest }
    >({
      query: (data) => ({
        url: `/${data.eventId}/slots`,
        method: "POST",
        body: { slot: data.slot },
        headers: { Authorization: `Bearer ${getUserAuthToken()}` },
      }),
    }),

    deleteSlot: builder.mutation<void, { eventId: number; slotId: number }>({
      query: ({ eventId, slotId }) => ({
        url: `/${eventId}/slots/${slotId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${getUserAuthToken()}` },
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useDeleteEventMutation,
  useCreateSlotMutation,
  useDeleteSlotMutation,
} = eventApi;
