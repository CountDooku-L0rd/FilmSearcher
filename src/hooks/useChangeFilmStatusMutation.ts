import { useMutation } from "@tanstack/react-query";
import type { EStatus } from "@yp-mentor/films-server-types";
import type { AppDispatch } from "../store/store";
import FilmsApi from "../FilmsApi/FilmsApi";

export const useChangeFilmStatusMutation = (dispatch: AppDispatch) => {
  return useMutation({
    mutationFn: ({filmId, changeStatus}: {filmId: number, changeStatus: EStatus}) => FilmsApi.changeFilmStatusRequest(filmId, changeStatus, dispatch),
    onSuccess: () => FilmsApi.changeFilmStatusOnSuccess(),
    onError: (error) => FilmsApi.onError(error),

    onSettled: () => FilmsApi.onSettled(dispatch),
  });
};
