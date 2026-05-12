import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FilmsAPI } from "@yp-mentor/films-server-types";
import { filmsApi } from "./api/filmsApi/filmsApi";

type GetFilmsSuccessResponseType = Awaited<ReturnType<FilmsAPI["getFilms"]>>;
interface MainState {
  films: GetFilmsSuccessResponseType["data"];
  filmStatistic: {
    total: number | undefined;
    averageRating: number | null;
    watched: number | null;
  };
  pagination: GetFilmsSuccessResponseType["pagination"];
  isServerRequest: boolean;
  isUpdating: boolean;
}

const initialState: MainState = {
  films: [],
  filmStatistic: {
    total: undefined,
    averageRating: null,
    watched: null,
  },
  pagination: {
    currentPage: 1,
    pageSize: 8,
    total: 0,
  },
  isServerRequest: false,
  isUpdating: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setFilms: (
      state,
      action: PayloadAction<GetFilmsSuccessResponseType["data"]>,
    ) => {
      state.films = action.payload;
    },
    setStatistic: (
      state,
      action: PayloadAction<GetFilmsSuccessResponseType["statistic"]>,
    ) => {
      state.filmStatistic = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<GetFilmsSuccessResponseType["pagination"]>,
    ) => {
      state.pagination = action.payload;
    },
    setIsServerRequest: (state, action: PayloadAction<boolean>) => {
      state.isServerRequest = action.payload;
    },
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      filmsApi.endpoints.getFilms.matchFulfilled,
      (state, { payload }) => {
        state.films = payload.data;
        state.filmStatistic = payload.statistic;
        state.pagination = payload.pagination;
      },
    );
  },
});

export const {
  setFilms,
  setStatistic,
  setPagination,
  setIsServerRequest,
  setIsUpdating,
} = mainSlice.actions;

export default mainSlice.reducer;
