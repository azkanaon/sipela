import { useEffect } from "react";

export const useClosePopupWithEscKey = (handleOpen) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleOpen]);
};

export const handleOutsideClick = (handleOpen) => {
  handleOpen(false);
};

export const handleContentClick = (event) => {
  event.stopPropagation();
};
