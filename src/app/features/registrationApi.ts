import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/app";
import { RootState } from "../store";

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/registrations`,
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.tokenState?.token || "";
      headers.set("Authorization", `Bearer ${token}`);
    },
  }),
  tagTypes: ["Registration"],
  endpoints: (builder) => ({
    payment: builder.mutation<void, { registrationId: number; amount: number }>(
      {
        query: (data) => ({
          url: `/${data.registrationId}/payments`,
          method: "POST",
          body: {
            payment: {
              amount: data.amount,
              status: "PAID",
            },
          },
        }),
      },
    ),

    deleteRegistration: builder.mutation<void, { registrationId: number }>({
      query: ({ registrationId }) => ({
        url: `/${registrationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { usePaymentMutation, useDeleteRegistrationMutation } =
  registrationApi;
