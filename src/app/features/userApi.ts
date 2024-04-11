import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/app";
import {
  IUserLoginRawResponse,
  IUserLoginRequest,
  IUserLoginResponse,
  IUserRegisterRawResponse,
  IUserRegisterRequest,
  IUserRegisterResponse,
  IUserStatusResponse,
  TUserRole,
} from "../../types/user";
import { RootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.tokenState.token;
      headers.set("Authorization", `Bearer ${token}`);
    },
  }),
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

        transformResponse: (response: IUserRegisterRawResponse) => {
          const token = response?.token;
          const user = response?.user;

          return {
            token,
            user: {
              user_name: user.user_name,
              mobile_no: user.mobile_no,
              role: user.access_role.role.toUpperCase() as TUserRole,
            },
          };
        },
      },
    ),

    loginUser: builder.mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (data) => ({
        url: "/sign_in",
        method: "POST",
        body: data,
      }),

      transformResponse: (response: IUserLoginRawResponse) => {
        const token = response?.token;
        const user = response?.user;

        return {
          token,
          user: {
            user_name: user.user_name,
            mobile_no: user.mobile_no,
            role: user.access_role.role.toUpperCase() as TUserRole,
          },
        };
      },
    }),

    getUser: builder.query<IUserStatusResponse, void>({
      query: () => ({
        url: "/current_user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
} = userApi;
