import { useContext } from "react";
import { ChordSettingsContext } from "../model/ChordSettingsContext";

export const useChordSettings = () => {
  const context = useContext(ChordSettingsContext);
  if (!context) {
    throw new Error(
      "useChordSettings must be used within a ChordSettingsProvider",
    );
  }
  return context;
};
