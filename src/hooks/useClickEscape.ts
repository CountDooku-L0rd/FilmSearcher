import { useEffect } from "react";
import { useAppDispatch } from "./storeHooks";
import { setIsAddModalOpen, setIsEditModalOpen } from "../store/modalSlice";

export const useClickEscape = (isOpen: boolean) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(setIsEditModalOpen(false));
        dispatch(setIsAddModalOpen(false));
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown as EventListener);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, dispatch]);
};
