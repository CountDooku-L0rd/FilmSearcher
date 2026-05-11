import type { FilmsAPI } from "@yp-mentor/films-server-types";

export type GetFilmsRequestType = Parameters<FilmsAPI["getFilms"]>[0];
export type GetFilmsSuccessResponseType = Awaited<ReturnType<FilmsAPI["getFilms"]>>;
export type CreateFilmRequestType = Parameters<FilmsAPI["createFilm"]>[0];
export type CreateFilmResponseType = Awaited<ReturnType<FilmsAPI["createFilm"]>>;
export type DeleteFilmRequestType = Parameters<FilmsAPI["deleteFilm"]>[0];
export type DeleteFilmResponseType = Awaited<ReturnType<FilmsAPI["deleteFilm"]>>;
export type UpdateFilmRequestType = Parameters<FilmsAPI["updateFilm"]>[0];
export type UpdateFilmResponseType = Awaited<ReturnType<FilmsAPI["updateFilm"]>>;
export type ChangeFilmStatusRequestType = Parameters<FilmsAPI["changeFilmStatus"]>[0];
export type ChangeFilmStatusResponseType = Awaited<ReturnType<FilmsAPI["changeFilmStatus"]>>;