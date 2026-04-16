import type {EStatus} from "../../../../../constants/constants.ts";

export interface FilmButtonProps {
    type: string,
    status?: EStatus,
    onClick: () => void
}

