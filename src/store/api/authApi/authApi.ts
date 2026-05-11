import { createApi } from "@reduxjs/toolkit/query/react";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "./authApiTypes";
import { baseQueryWithReauth, unwrapData } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      //transformResponse: unwrapData,
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/api/auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: unwrapData,
    }),
    getMe: builder.query<User | null, void>({
      query: () => "/api/auth/me",
      transformResponse: unwrapData,
      providesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      transformResponse: unwrapData,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
