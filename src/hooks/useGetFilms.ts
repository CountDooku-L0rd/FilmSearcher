import { useEffect } from "react";
import FilmsService from "../api/FilmsService.ts";
import { useAppDispatch } from "./storeHooks.ts";
import { setFilms, setStatistic, toggleIsLoading } from "../store/mainSlice.ts";
import type {IGetFilmsRequest} from "../api/apiTypes.ts";

export function useGetFilms(body: IGetFilmsRequest) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(toggleIsLoading());
    FilmsService.getFilms(body)
      .then((result) => {
        dispatch(setFilms(result.data));
        dispatch(setStatistic(result.statistic));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(toggleIsLoading());
      });
  }, []);
}
