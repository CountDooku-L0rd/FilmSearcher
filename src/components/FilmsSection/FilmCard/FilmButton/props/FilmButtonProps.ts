import type {EStatus} from "@yp-mentor/films-server-types";

export interface FilmButtonProps {
    id: number,
    type: string,
    status?: EStatus,
    onClick: (id: number, status?: EStatus) => Promise<void> | void
}