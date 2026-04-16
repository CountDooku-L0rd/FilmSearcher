import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  genreValue: { value: string; label: string };
  ratingValue: { value: string; label: string };
  statusValue: { value: string; label: string };
  startYear: number | null;
  endYear: number | null;
  sortBy: { value: string; label: string };
  sortingOrder: { value: string; label: string };
}

const initialState: FilterState = {
  genreValue: { value: "allGenres", label: "Все жанры" },
  ratingValue: { value: "allRatings", label: "Любой рейтинг" },
  statusValue: { value: "allStatuses", label: "Все статусы" },
  startYear: null,
  endYear: null,
  sortBy: { value: "byName", label: "Названию" },
  sortingOrder: { value: "descOrder", label: "По убыванию" },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setGenreValue: (
      state,
      action: PayloadAction<{ value: string; label: string }>,
    ) => {
      state.genreValue = action.payload;
    },
    setRatingValue: (
      state,
      action: PayloadAction<{ value: string; label: string }>,
    ) => {
      state.ratingValue = action.payload;
    },
    setStatusValue: (
      state,
      action: PayloadAction<{ value: string; label: string }>,
    ) => {
      state.statusValue = action.payload;
    },
    setStartYear: (state, action: PayloadAction<number | null>) => {
      state.startYear = action.payload;
    },
    setEndYear: (state, action: PayloadAction<number | null>) => {
      state.endYear = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<{ value: string; label: string }>,
    ) => {
      state.sortBy = action.payload;
    },
    setSortingOrder: (
      state,
      action: PayloadAction<{ value: string; label: string }>,
    ) => {
      state.sortingOrder = action.payload;    
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
} = filterSlice.actions;

export default filterSlice.reducer;
