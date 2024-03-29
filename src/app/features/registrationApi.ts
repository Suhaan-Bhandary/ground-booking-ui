import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/app";
import { getUserAuthToken } from "../../helpers/authToken";

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/registrations`,
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
          headers: { Authorization: `Bearer ${getUserAuthToken()}` },
        }),
      },
    ),

    deleteRegistration: builder.mutation<void, { registrationId: number }>({
      query: ({ registrationId }) => ({
        url: `/${registrationId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${getUserAuthToken()}` },
      }),
    }),
  }),
});

export const { usePaymentMutation, useDeleteRegistrationMutation } =
  registrationApi;
