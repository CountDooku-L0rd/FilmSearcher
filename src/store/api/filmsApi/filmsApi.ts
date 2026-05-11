import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";
import type {
  ChangeFilmStatusRequestType,
  ChangeFilmStatusResponseType,
  CreateFilmRequestType,
  CreateFilmResponseType,
  DeleteFilmRequestType,
  DeleteFilmResponseType,
  GetFilmsRequestType,
  GetFilmsSuccessResponseType,
  UpdateFilmRequestType,
  UpdateFilmResponseType,
} from "./filmsApiTypes";

export const filmsApi = createApi({
  reducerPath: "filmsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Film"],
  endpoints: (builder) => ({
    getFilms: builder.mutation<GetFilmsSuccessResponseType, GetFilmsRequestType>({
      query: (request) => ({
        url: "/getFilms",
        method: "POST",
        body: request,
      }),
      //transformResponse: unwrapData,
    }),
    createFilm: builder.mutation<CreateFilmResponseType, CreateFilmRequestType>(
      {
        query: (request) => ({
          url: "/createFilm",
          method: "POST",
          body: request,
        }),
        invalidatesTags: ["Film"],
       // transformResponse: unwrapData,
      },
    ),
    deleteFilm: builder.mutation<DeleteFilmResponseType, DeleteFilmRequestType>(
      {
        query: (request) => ({
          url: `/deleteFilm/${request.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Film"],
        //transformResponse: unwrapData,
      },
    ),
    updateFilm: builder.mutation<UpdateFilmResponseType, UpdateFilmRequestType>(
      {
        query: (request) => ({
          url: `/updateFilm/${request.id}`,
          method: "PUT",
          body: request.body,
        }),
        invalidatesTags: ["Film"],
        //transformResponse: unwrapData,
      },
    ),
    changeFilmStatus: builder.mutation<
      ChangeFilmStatusResponseType,
      ChangeFilmStatusRequestType
    >({
      query: (request) => ({
        url: `/changeFilmStatus/${request.id}`,
        method: "PATCH",
        body: request.body,
      }),
      invalidatesTags: ["Film"],
      //transformResponse: unwrapData,
    }),
  }),
});

export const {
  useGetFilmsMutation,
  useCreateFilmMutation,
  useDeleteFilmMutation,
  useUpdateFilmMutation,
  useChangeFilmStatusMutation,
} = filmsApi;
