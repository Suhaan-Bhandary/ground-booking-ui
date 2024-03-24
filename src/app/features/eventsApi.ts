import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/app";
import { getUserAuthToken } from "../../helpers/authToken";
import { IEventCreateRequest, IEventCreateResponse } from "../../types/event";

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

    deleteEvent: builder.mutation<IEventCreateResponse, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${getUserAuthToken()}` },
      }),
    }),
  }),
});

export const { useCreateEventMutation, useDeleteEventMutation } = eventApi;
