import type {EStatus} from "@yp-mentor/films-server-types";
import type { EFilmButtonTypes } from "../../../../../constants/constants";

export interface FilmButtonTypes {
    id: number,
    type: EFilmButtonTypes,
    status?: EStatus,
    onClick: (id: number, status?: EStatus) => Promise<void> | void
}