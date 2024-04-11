import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/app";
import {
  IEventCreateRequest,
  IEventCreateResponse,
  ISlotCreateRequest,
  ISlotCreateResponse,
} from "../../types/event";
import { RootState } from "../store";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/events`,
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.tokenState?.token || "";
      headers.set("Authorization", `Bearer ${token}`);
    },
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    // First is the return type and second is the Body
    createEvent: builder.mutation<IEventCreateResponse, IEventCreateRequest>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),

    deleteEvent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
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
      }),
    }),

    deleteSlot: builder.mutation<void, { eventId: number; slotId: number }>({
      query: ({ eventId, slotId }) => ({
        url: `/${eventId}/slots/${slotId}`,
        method: "DELETE",
      }),
    }),

    registerSlot: builder.mutation<void, { eventId: number; slotId: number }>({
      query: (data) => ({
        url: `/${data.eventId}/slots/${data.slotId}/registrations`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useDeleteEventMutation,
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useRegisterSlotMutation,
} = eventApi;
