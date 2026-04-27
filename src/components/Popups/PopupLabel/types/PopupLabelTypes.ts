import type { ChangeEvent } from "react";

export interface  PopupLabelTypes extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>  {
  value: string;
    title: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    placeholder?: string;
};