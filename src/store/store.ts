import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import sortSlice from "./sortSlice.ts";
import filterSlice from "./filterSlice.ts";
import modalSlice from "./modalSlice.ts";
import authSlice from "./authSlice.ts";
import { authApi } from "./api/authApi/authApi.ts";
import { checkErrorMiddleware } from "./middlewares/checkErrorMiddleware/checkErrorMiddleware.ts";
import { filmsApi } from "./api/filmsApi/filmsApi.ts";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    sort: sortSlice,
    filter: filterSlice,
    modal: modalSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      filmsApi.middleware,
      checkErrorMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
