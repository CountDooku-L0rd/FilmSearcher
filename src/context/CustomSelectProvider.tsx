import {type ReactNode, useState} from "react";
import {CustomSelectContext} from "./CustomSelectContext.ts";

export const CustomSelectProvider = ({children}: {children: ReactNode}) => {
    const [activeId, setActiveId] = useState<string|null>(null)
    return (
        <CustomSelectContext.Provider value={{activeId, setActiveId}}>
            {children}
        </CustomSelectContext.Provider>
)
}