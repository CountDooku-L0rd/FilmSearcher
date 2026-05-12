import { useAppSelector } from "./storeHooks.ts";
import { useGetFilmsMutation } from "../store/api/filmsApi/filmsApi.ts";
import { createBodyForGetFilmsRequest } from "../utils/utils.ts";
import { useCallback } from "react";

export function useGetFilms() {
  const [getFilmsTrigger] = useGetFilmsMutation({
    fixedCacheKey: "shared-get-films",
  });
  const filters = useAppSelector((state) => state.filter);
  const getFilms = useCallback(() => {
    getFilmsTrigger(createBodyForGetFilmsRequest(filters));
  }, [filters, getFilmsTrigger]);

  return { getFilms };
}
