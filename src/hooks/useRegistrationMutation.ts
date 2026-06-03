import { useMutation } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import AuthApi from "../AuthApi/AuthApi";
import type { IRegistrationRequestBody } from "../AuthApi/types/AuthApiTypes";

export const useRegistrationMutate = (navigate: NavigateFunction) => {
  return useMutation({
    mutationFn: (body: IRegistrationRequestBody) => AuthApi.registrarion(body),
    onSuccess: () => AuthApi.registrationOnSuccess(navigate),
    onError: (error) => AuthApi.onError(error),
  });
};
