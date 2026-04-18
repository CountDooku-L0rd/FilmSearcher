import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {EGenre, ESortField, ESortOrder, EStatus} from "@yp-mentor/films-server-types";

interface FilterState {
  genreValue: EGenre | null;
  ratingValue: { value: string; label: string };
  statusValue: EStatus | null;
  startYear: number | null;
  endYear: number | null;
  sortBy: ESortField;
  sortingOrder: ESortOrder;
  searchString: string;
  page: number;
  pageSize: number;
}

const initialState: FilterState = {
  genreValue: null,
  ratingValue: { value: "allRatings", label: "Любой рейтинг" },
  statusValue: null,
  startYear: null,
  endYear: null,
  sortBy: ESortField.title,
  sortingOrder: ESortOrder.desc,
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
      action: PayloadAction<EGenre | null>,
    ) => {
      if (Number.isNaN(action.payload)) {
        state.genreValue = null;
      }
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
      action: PayloadAction<EStatus | null>,
    ) => {
      if (Number.isNaN(action.payload)) {
        state.statusValue = null;
      }
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
      action: PayloadAction<ESortField>,
    ) => {
      state.sortBy = action.payload;
    },
    setSortingOrder: (
      state,
      action: PayloadAction<ESortOrder>,
    ) => {
      state.sortingOrder = action.payload;    
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    }
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
