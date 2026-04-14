import {createContext} from "react";

interface CustomSelectContextValue{
    activeId: string|null;
    setActiveId: (id: string|null) => void;
}

export const CustomSelectContext = createContext<CustomSelectContextValue|undefined>(undefined);