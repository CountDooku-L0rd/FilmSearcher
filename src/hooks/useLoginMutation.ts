import { useMutation } from "@tanstack/react-query";
import AuthApi from "../AuthApi/AuthApi";
import type { NavigateFunction } from "react-router";
import type { ILoginRequestBody, ILoginResponseBody } from "../AuthApi/types/AuthApiTypes";
import type { AppDispatch } from "../store/store";

export const useLoginMutation = (dispatch: AppDispatch, navigate: NavigateFunction) => {
  return useMutation({
    mutationFn: (body: ILoginRequestBody) => AuthApi.login(body),
    onSuccess: (data: ILoginResponseBody) => AuthApi.loginOnSuccess(data, dispatch, navigate),
    onError: (error) => AuthApi.onError(error),
  });
};
