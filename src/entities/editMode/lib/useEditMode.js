import { useContext } from "react";
import { EditModeContext } from "../model/EditModeContext";

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error("useEditMode must be used within a EditModeProvider");
  }
  return context;
};
