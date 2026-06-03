import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { useGetFilms } from "./useGetFilms";
import { setFilms, setPagination, setStatistic } from "../store/mainSlice";
import { shallowEqual } from "react-redux";
import { createBodyForGetFilmsRequest } from "../utils/utils";
import { showErrorToast } from "../toasts/toasts";

export function useGetFilmsWithSync() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter, shallowEqual);
  const body = useMemo(() => createBodyForGetFilmsRequest(filters), [filters]);
  const getFilms = useGetFilms(body, filters);

  useEffect(() => {
    if (getFilms.error) {
      showErrorToast(getFilms.error.message);
    }
  }, [getFilms.error]);

  useEffect(() => {
    if (getFilms.data) {
      dispatch(setFilms(getFilms.data.data));
      dispatch(setStatistic(getFilms.data.statistic));
      dispatch(setPagination(getFilms.data.pagination));
    }
  }, [getFilms.data, dispatch]);

  return getFilms;
}
