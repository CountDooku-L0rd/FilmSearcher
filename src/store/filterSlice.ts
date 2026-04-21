import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  EGenre,
  ESortField,
  ESortOrder,
  EStatus,
} from "@yp-mentor/films-server-types";

interface FilterState {
  genreValue: { value: EGenre; label: string };
  ratingValue: { value: string; label: string };
  statusValue: { value: EStatus; label: string };
  startYear: number | null;
  endYear: number | null;
  sortBy: { value: ESortField; label: string };
  sortingOrder: { value: ESortOrder; label: string };
  searchString: string;
  page: number;
  pageSize: number;
}

const initialState: FilterState = {
  genreValue: { value: EGenre.all, label: "Все жанры" },
  ratingValue: { value: "allRatings", label: "Любой рейтинг" },
  statusValue: { value: EStatus.all, label: "Все статусы" },
  startYear: null,
  endYear: null,
  sortBy: { value: ESortField.rating, label: "Рейтингу" },
  sortingOrder: { value: ESortOrder.desc, label: "По убыванию" },
  searchString: "",
  page: 1,
  pageSize: 8,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setGenreValue: (
      state,
      action: PayloadAction<{ value: EGenre; label: string }>,
    ) => {
      state.genreValue.value = action.payload.value;
      state.genreValue.label = action.payload.label;
    },
    setRatingValue: (
      state,
      action: PayloadAction<{ value: string; label: string }>,
    ) => {
      state.ratingValue = action.payload;
    },
    setStatusValue: (
      state,
      action: PayloadAction<{ value: EStatus; label: string }>,
    ) => {
      state.statusValue.value = action.payload.value;
      state.statusValue.label = action.payload.label;
    },
    setStartYear: (state, action: PayloadAction<number | null>) => {
      state.startYear = action.payload;
    },
    setEndYear: (state, action: PayloadAction<number | null>) => {
      state.endYear = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<{ value: ESortField; label: string }>,
    ) => {
      state.sortBy.value = action.payload.value;
      state.sortBy.label = action.payload.label;
    },
    setSortingOrder: (
      state,
      action: PayloadAction<{ value: ESortOrder; label: string }>,
    ) => {
      state.sortingOrder.value = action.payload.value;
      state.sortingOrder.label = action.payload.label;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  setGenreValue,
  setStatusValue,
  setRatingValue,
  setStartYear,
  setEndYear,
  setSortBy,
  setSortingOrder,
  setSearchString,
  setPage,
  setPageSize,
} = filterSlice.actions;

export default filterSlice.reducer;
