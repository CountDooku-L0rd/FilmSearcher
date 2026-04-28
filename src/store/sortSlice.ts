import { createSlice } from "@reduxjs/toolkit";

interface SortState {
  isSortOpen: boolean;
  isFilterOpen: boolean;
}

const initialState: SortState = {
  isSortOpen: false,
  isFilterOpen: false,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    toggleSortOpen: (state) => {
      if (state.isFilterOpen) {
        state.isFilterOpen = false;
      }
      state.isSortOpen = !state.isSortOpen;
    },
    toggleFilterOpen: (state) => {
      if (state.isSortOpen) {
        state.isSortOpen = false;
      }
      state.isFilterOpen = !state.isFilterOpen;
    },
  },
});

export const { toggleSortOpen, toggleFilterOpen } = sortSlice.actions;

export default sortSlice.reducer;
