import { useContext } from "react";
import { SequenceSettingsContext } from "../model/SequenceSettingsContext";

export const useSequenceSettings = () => {
  const context = useContext(SequenceSettingsContext);
  if (!context) {
    throw new Error(
      "useSequenceSettings must be used within a SequenceSettingsProvider",
    );
  }
  return context;
};
