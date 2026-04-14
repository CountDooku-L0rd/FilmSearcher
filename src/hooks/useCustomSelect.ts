import {useContext} from "react";
import {CustomSelectContext} from "../context/CustomSelectContext.ts";

export const useCustomSelect = () => {
    const context = useContext(CustomSelectContext)
    if (!context) throw new Error('useCustomSelect должен быть использован внутри своего провайдера')
    return context
}