import { filmService } from "../api/FilmsService.ts";
import { useAppDispatch, useAppSelector } from "./storeHooks.ts";
import {
  setFilms,
  setStatistic,
  setIsLoading,
  setPagination,
  setServerError,
  setIsUpdating,
} from "../store/mainSlice.ts";
import type { FilmsAPI } from "@yp-mentor/films-server-types";

type GetFilmsRequestType = Parameters<FilmsAPI["getFilms"]>[0];
export function useGetFilms() {
  const dispatch = useAppDispatch();
  const {
    sortBy,
    sortingOrder,
    genreValue,
    statusValue,
    ratingValue,
    endYear,
    startYear,
    searchString,
    page,
    pageSize,
  } = useAppSelector((store) => store.filter);
  const getFilms = () => {
    dispatch(setIsLoading(true));
    const body: GetFilmsRequestType["body"] = {
      filters: {
        genre: genreValue.value,
        minRating: ratingValue.value === 0 ? undefined : ratingValue.value,
        status: statusValue.value,
        yearRange: startYear
          ? {
              from: startYear,
              to: endYear ? endYear : undefined,
            }
          : endYear
            ? {
                from: startYear ? startYear : undefined,
                to: endYear,
              }
            : undefined,
      },
      sort: {
        field: sortBy.value,
        order: sortingOrder.value,
      },
      searchString: searchString ? searchString : undefined,
      pagination: {
        page: page,
        pageSize: pageSize,
      },
    };
    filmService
      .getFilms({ body })
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
        dispatch(setIsUpdating(false))
      });
  };
  return { getFilms };
}
