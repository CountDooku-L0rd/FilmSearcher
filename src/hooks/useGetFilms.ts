import { useAppDispatch, useAppSelector } from "./storeHooks.ts";
import {
  setFilms,
  setStatistic,
  setIsLoading,
  setPagination,
  setServerError,
  setIsUpdating,
} from "../store/mainSlice.ts";
import { useGetFilmsMutation } from "../store/api/filmsApi/filmsApi.ts";
import { createBodyForGetFilmsRequest } from "../utils/utils.ts";

export function useGetFilms() {
  const dispatch = useAppDispatch();
  const [getFilmsTrigger] = useGetFilmsMutation();
  const filters = useAppSelector(state => state.filter)
  const getFilms = () => {
    dispatch(setIsLoading(true));
    getFilmsTrigger((createBodyForGetFilmsRequest(filters)))
      .unwrap()
      .then((result) => {
        dispatch(setFilms(result.data));
        dispatch(setStatistic(result.statistic));
        dispatch(setPagination(result.pagination));
      })
      .catch((err: Error) => {
        dispatch(setServerError(true));
        console.error(err.message);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
        dispatch(setIsUpdating(false));
      });
  }


  return { getFilms };
}
