import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/app";
import { IUserRegisterRequest, IUserRegisterResponse } from "../../types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // First is the return type and second is the Body
    registerUser: builder.mutation<IUserRegisterResponse, IUserRegisterRequest>(
      {
        query: (data) => ({
          url: "/sign_up",
          method: "POST",
          body: data,
        }),

        transformResponse: (response: IUserRegisterResponse) => {
          const token = response?.token;
          const user = response?.user;

          return {
            token,
            user: {
              user_name: user.user_name,
              mobile_no: user.mobile_no,
              role: user.role,
            },
          };
        },
      },
    ),
  }),
});

export const { useRegisterUserMutation } = userApi;
