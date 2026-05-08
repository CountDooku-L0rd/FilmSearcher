// store.ts
import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import sortSlice from "./sortSlice.ts";
import filterSlice from "./filterSlice.ts";
import modalSlice from "./modalSlice.ts";
import authSlice from './AuthSlice.ts';
import { authApi } from './api/authApi.ts';

export const store = configureStore({
  reducer: {
    main: mainSlice,
    sort: sortSlice,
    filter: filterSlice,
    modal: modalSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;