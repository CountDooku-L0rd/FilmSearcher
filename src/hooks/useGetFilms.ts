import { useEffect } from "react";
import FilmsService from "../api/FilmsService.ts";
import { useAppDispatch } from "./storeHooks.ts";
import { setFilms, setStatistic, toggleIsLoading } from "../store/mainSlice.ts";
import type {FilmsAPI} from "@yp-mentor/films-server-types";

type GetFilmsRequestType = Parameters<FilmsAPI['getFilms']>[0];
export function useGetFilms(body: GetFilmsRequestType) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(toggleIsLoading());
    const filmsService = new FilmsService();
    filmsService.getFilms(body)
      .then((result) => {
        dispatch(setFilms(result.data));
        dispatch(setStatistic(result.statistic));
      })
      .catch((err: Error) => {
        console.error(err.message);
      })
      .finally(() => {
        dispatch(toggleIsLoading());
      });
  }, []);
}
