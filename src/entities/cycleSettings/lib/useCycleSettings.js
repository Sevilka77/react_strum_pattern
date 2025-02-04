import { useContext } from "react";
import { CycleSettingsContext } from "../model/CycleSettingsContext";

export const useCycleSettings = () => {
  const context = useContext(CycleSettingsContext);
  if (!context) {
    throw new Error(
      "useCycleSettings must be used within a CycleSettingsProvider",
    );
  }
  return context;
};
