import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMutateSignIn, ISignInResponse } from "./types";

export const signInSlice = createApi({
  reducerPath: "signIn",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.URL,
  }),
  endpoints(builder) {
    return {
      signInService: builder.mutation<ISignInResponse, IMutateSignIn>({
        query(service) {
          return {
            url: "/auth/sign-in",
            method: "POST",
            credentials: "include",
            body: service,
          };
        },
      }),
    };
  },
});

export const { useSignInServiceMutation } = signInSlice;
