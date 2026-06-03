import { useMutation } from "@tanstack/react-query";
import AuthApi from "../AuthApi/AuthApi";
import type { AppDispatch } from "../store/store";
import type { NavigateFunction } from "react-router";
import type { IRefreshResponseBody } from "../AuthApi/types/AuthApiTypes";

export const useRefreshMutation = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  return useMutation({
    mutationFn: () => AuthApi.refreshRequest(),
    onError: (error) => AuthApi.refreshOnError(error, dispatch, navigate),
    onSuccess: (data: IRefreshResponseBody) => AuthApi.refreshOnSuccess(data),
  });
};
