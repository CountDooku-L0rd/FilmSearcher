import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  IFilm,
  IGetFilmsSuccessResponse,
  IStatistic,
} from "../api/apiTypes.ts";

interface MainState {
  isLoading: boolean;
  films: IGetFilmsSuccessResponse["data"];
  filmStatistic: {
    total: number | null;
    averageRating: number | null;
    watched: number | null;
  };
}

const initialState: MainState = {
  isLoading: false,
  films: [],
  filmStatistic: {
    total: null,
    averageRating: null,
    watched: null,
  },
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setFilms: (state, action: PayloadAction<IFilm[]>) => {
      state.films = action.payload;
    },
    setStatistic: (state, action: PayloadAction<IStatistic>) => {
      state.filmStatistic = action.payload;
    },
  },
});

export const { toggleIsLoading, setFilms, setStatistic } = mainSlice.actions;

export default mainSlice.reducer;
