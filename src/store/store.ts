import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import sortSlice from "./sortSlice.ts";
import filterSlice from "./filterSlice.ts";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    sort: sortSlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
