import { useQuery } from "@tanstack/react-query";
import type { FilmsAPI } from "@yp-mentor/films-server-types";
import type { FilterState } from "../store/filterSlice.ts";
import FilmsApi from "../FilmsApi/FilmsApi.ts";

type GetFilmsResponseType = Awaited<ReturnType<FilmsAPI["getFilms"]>>;
type GetFilmsRequestType = Parameters<FilmsAPI["getFilms"]>[0]['body']

export const useGetFilms = (body: GetFilmsRequestType, filters: FilterState) => {
  return useQuery<GetFilmsResponseType>({
    queryKey: ["films", JSON.stringify(filters)],
    queryFn: () => FilmsApi.getFilms(body),
    enabled: !!localStorage.getItem("accessToken"),
    refetchOnMount: false,
    refetchOnWindowFocus: false, 
    refetchOnReconnect: false,
  });
}
