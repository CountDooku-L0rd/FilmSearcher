import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import sortSlice from "./sortSlice.ts";
import filterSlice from "./filterSlice.ts";
import modalSlice from "./modalSlice.ts";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    sort: sortSlice,
    filter: filterSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
