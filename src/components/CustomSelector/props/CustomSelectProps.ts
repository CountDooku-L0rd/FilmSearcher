export interface CustomSelectProps {
    options: {value: string; label: string}[];
    value?: {value: string; label: string} | null;
    onChange: (option: {value: string; label: string}) => void;
    title: string;
    width: number;
}