import { useContext } from "react";
import { ToneSettingsContext } from "../model/ToneSettingsContext";

export const useToneSettings = () => {
  const context = useContext(ToneSettingsContext);
  if (!context) {
    throw new Error(
      "useToneSettings must be used within a ToneSettingsProvider",
    );
  }
  return context;
};
