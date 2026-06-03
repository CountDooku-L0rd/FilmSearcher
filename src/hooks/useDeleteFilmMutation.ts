import { useMutation } from "@tanstack/react-query";
import type { AppDispatch } from "../store/store";
import FilmsApi from "../FilmsApi/FilmsApi";

export const useDeleteFilmMutation = (
  filmId: number,
  dispatch: AppDispatch,
) => {
  return useMutation({
    mutationFn: () => FilmsApi.deleteFilmRequest(dispatch, filmId),
    onSuccess: () => FilmsApi.deleteFilmOnSuccess(),
    onError: (error) => FilmsApi.onError(error),
    onSettled: () => FilmsApi.onSettled(dispatch),
  });
};
