import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { showErrorToast } from "../../../toasts/toasts";
import type { IErrorPayload } from "./checkErrorMiddlewareTypes";

export const checkErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    showErrorToast(
      (action.payload as IErrorPayload)?.data?.errorMessage ??
        "Неизваестная ошибка",
    );
  }
  return next(action);
};
