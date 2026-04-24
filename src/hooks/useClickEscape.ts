import { useEffect } from "react";


export const useClickEscape = (onClose: () => void, isOpen: boolean) => {
    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);
}
