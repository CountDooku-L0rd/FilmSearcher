import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import sortSlice from "./sortSlice.ts";
import genreSlice from "./genreSlice.ts";
import statusSlice from "./statusSlice.ts";
import ratingSlice from "./ratingSlice.ts";
import yearSlice from "./yearSlice.ts";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    sort: sortSlice,
    genre: genreSlice,
    status: statusSlice,
    rating: ratingSlice,
    year: yearSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
