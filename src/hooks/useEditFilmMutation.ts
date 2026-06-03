import { useMutation } from "@tanstack/react-query";
import type { AppDispatch } from "../store/store";
import type { CreateOrUpdateFilmRequestBodyType } from "../types/apiTypes";
import FilmsApi from "../FilmsApi/FilmsApi";

export const useEditFilmMutation = (dispatch: AppDispatch) => {
  return useMutation({
    mutationFn: ({
      body,
      filmId,
    }: {
      body: CreateOrUpdateFilmRequestBodyType;
      filmId: number;
    }) => FilmsApi.editFilmRequest(filmId, body, dispatch),
    onSuccess: () => FilmsApi.editFilmOnSuccess(dispatch),
    onError: (error) => FilmsApi.onError(error),
    onSettled: () => FilmsApi.onSettled(dispatch),
  });
};
