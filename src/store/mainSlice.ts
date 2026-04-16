import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {FilmsAPI} from "@yp-mentor/films-server-types";

type GetFilmsSuccessResponseType = Awaited<ReturnType<FilmsAPI['getFilms']>>;
interface MainState {
  isLoading: boolean;
  films: GetFilmsSuccessResponseType["data"];
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
    setFilms: (state, action: PayloadAction<GetFilmsSuccessResponseType["data"]>) => {
      state.films = action.payload;
    },
    setStatistic: (state, action: PayloadAction<GetFilmsSuccessResponseType["statistic"]>) => {
      state.filmStatistic = action.payload;
    },
  },
});

export const { toggleIsLoading, setFilms, setStatistic } = mainSlice.actions;

export default mainSlice.reducer;
