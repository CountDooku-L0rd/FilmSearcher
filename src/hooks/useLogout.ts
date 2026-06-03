import { useMutation } from "@tanstack/react-query";
import AuthApi from "../AuthApi/AuthApi";
import type { AppDispatch } from "../store/store";
import type { NavigateFunction } from "react-router";

export const useLogout = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  return useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess: () => AuthApi.logoutOnSuccess(dispatch, navigate),
    onError: (error) => AuthApi.onError(error),
  });
};
