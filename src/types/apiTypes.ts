import type { FilmsAPI } from "@yp-mentor/films-server-types";

export type CreateOrUpdateFilmRequestBodyType = Parameters<FilmsAPI["createFilm"]>[0]['body'];
