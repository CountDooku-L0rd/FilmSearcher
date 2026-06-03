import { useMutation } from "@tanstack/react-query"
import AuthApi from "../AuthApi/AuthApi"
import type { AppDispatch } from "../store/store"
import type { IMeResponseBody } from "../AuthApi/types/AuthApiTypes"
import type { NavigateFunction } from "react-router"

export const useMeMutation = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    return useMutation({
        mutationFn: () => AuthApi.me(),
        onSuccess: (data: IMeResponseBody) => AuthApi.meOnSuccess(data, dispatch, navigate), 
        onError: (error) => AuthApi.onError(error),
    })
}