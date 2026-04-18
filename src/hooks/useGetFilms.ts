import { useEffect } from "react";
import FilmsService from "../api/FilmsService.ts";
import {useAppDispatch, useAppSelector} from "./storeHooks.ts";
import { setFilms, setStatistic, setIsLoading } from "../store/mainSlice.ts";
import type {FilmsAPI} from "@yp-mentor/films-server-types";

type GetFilmsRequestType = Parameters<FilmsAPI['getFilms']>[0];
export function useGetFilms() {
  const dispatch = useAppDispatch();
  const {sortBy, sortingOrder, genreValue, statusValue, ratingValue, endYear, startYear, searchString, page, pageSize} = useAppSelector(store => store.filter);
  useEffect(() => {
    dispatch(setIsLoading(true));
    const body: GetFilmsRequestType = {
      body:{
        filters:{
          genre: genreValue ? genreValue : undefined,
          minRating: ratingValue.value==='allRatings' ? undefined : parseInt(ratingValue.value),
          status: statusValue ? statusValue : undefined,
          yearRange: startYear ? {
            from: startYear,
            to: endYear ? endYear : undefined,
          } : ( endYear ? {
            from: startYear ? startYear : undefined,
            to: endYear,
          } : undefined
          )
        },
        sort: sortBy ? {
          field: sortBy,
          order: sortingOrder,
        } : undefined,
        searchString: searchString ? searchString : undefined,
        pagination:{
          page: page,
          pageSize: pageSize,
        },
      }
    }
    console.log(body.body)
    const filmsService = new FilmsService();
    filmsService.getFilms(body.body)
      .then((result) => {
        dispatch(setFilms(result.data));
        dispatch(setStatistic(result.statistic));
      })
      .catch((err: Error) => {
        console.error(err.message);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, []);
}
