import { useMutation } from "@tanstack/react-query";
import type { CreateOrUpdateFilmRequestBodyType } from "../types/apiTypes";
import type { AppDispatch } from "../store/store";
import FilmsApi from "../FilmsApi/FilmsApi";

export const useCreateFilmMutation = (dispatch: AppDispatch) => {
  return useMutation({
    mutationFn: ({ body }: { body: CreateOrUpdateFilmRequestBodyType }) =>
      FilmsApi.createFilmRequest(body, dispatch),
    onSuccess: () => FilmsApi.createFilmOnSuccess(dispatch),
    onError: (error) => FilmsApi.onError(error),

    onSettled: () => FilmsApi.onSettled(dispatch),
  });
};
