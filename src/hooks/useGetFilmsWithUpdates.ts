import { useEffect } from "react";
import { useGetFilms } from "./useGetFilms";
import { useAppSelector } from "./storeHooks";

const useGetFilmsWithUpdates = () => {
  const {
    endYear,
    statusValue,
    page,
    pageSize,
    genreValue,
    ratingValue,
    searchString,
    sortBy,
    sortingOrder,
    startYear,
  } = useAppSelector((store) => store.filter);
  const { getFilms } = useGetFilms();
  useEffect(() => {
    getFilms();
  }, [
    endYear,
    statusValue,
    page,
    pageSize,
    genreValue,
    ratingValue,
    searchString,
    sortBy,
    sortingOrder,
    startYear,
    getFilms,
  ]);
};

export default useGetFilmsWithUpdates