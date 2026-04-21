import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {FilmsAPI} from "@yp-mentor/films-server-types";

type GetFilmsSuccessResponseType = Awaited<ReturnType<FilmsAPI['getFilms']>>;
interface MainState {
  isLoading: boolean;
  films: GetFilmsSuccessResponseType["data"];
  filmStatistic: {
    total: number | undefined;
    averageRating: number | null;
    watched: number | null;
  };
}

const initialState: MainState = {
  isLoading: true,
  films: [],
  filmStatistic: {
    total: undefined,
    averageRating: null,
    watched: null,
  },
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFilms: (state, action: PayloadAction<GetFilmsSuccessResponseType["data"]>) => {
      state.films = action.payload;
    },
    setStatistic: (state, action: PayloadAction<GetFilmsSuccessResponseType["statistic"]>) => {
      state.filmStatistic = action.payload;
    },
  },
});

export const { setIsLoading, setFilms, setStatistic } = mainSlice.actions;

export default mainSlice.reducer;
