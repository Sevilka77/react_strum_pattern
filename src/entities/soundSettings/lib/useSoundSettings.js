import { useContext } from "react";
import { SoundSettingsContext } from "../model/SoundSettingsContext";

export const useSoundSettings = () => {
  const context = useContext(SoundSettingsContext);
  if (!context) {
    throw new Error(
      "useSoundSettings must be used within a SoundSettingsProvider",
    );
  }
  return context;
};
