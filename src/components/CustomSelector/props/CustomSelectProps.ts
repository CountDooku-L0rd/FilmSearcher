import type {EGenre, ESortField, ESortOrder, EStatus} from "@yp-mentor/films-server-types";

export interface CustomSelectProps {
    options: {value: string; label: string}[];
    value?: ESortOrder | ESortField | EGenre | EStatus | {value:string, label:string} | null;
    getLabel: (value : ESortOrder | ESortField | EGenre | EStatus | {value:string, label:string} | null | undefined) => string;
    onChange: (option:{value: string; label: string}) => void;
    title: string;
    width: number;
}