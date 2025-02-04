// entities/soundSettings/model/SoundSettingsContext.js
import { createContext, useReducer, useMemo } from "react";
import { initialSoundSettings } from "./soundSettingsTypes";

export const SoundSettingsContext = createContext();

const setIsBeatSound = (state, isBeatSound) => ({ ...state, isBeatSound });
const setIsHitSound = (state, isHitSound) => ({ ...state, isHitSound });
const setIsMetronomeSound = (state, isMetronomeSound) => ({
  ...state,
  isMetronomeSound,
});
const setClickAlways = (state, clickAlways) => ({
  ...state,
  clickAlways,
});
const setClickMainBeat = (state, clickMainBeat) => ({
  ...state,
  clickMainBeat,
});
const setClickSubbeat = (state, clickSubbeat) => ({
  ...state,
  clickSubbeat,
});
const setClickTaktBeat = (state, clickTaktBeat) => ({
  ...state,
  clickTaktBeat,
});

export const SoundSettingsProvider = ({ children }) => {
  const [soundSettings, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "setIsBeatSound":
        return setIsBeatSound(state, action.data);
      case "setIsHitSound":
        return setIsHitSound(state, action.data);
      case "setIsMetronomSound":
        return setIsMetronomeSound(state, action.data);
      case "setClickAlways":
        return setClickAlways(state, action.data);
      case "setClickMainBeat":
        return setClickMainBeat(state, action.data);
      case "setClickSubbeat":
        return setClickSubbeat(state, action.data);
      case "setClickTaktBeat":
        return setClickTaktBeat(state, action.data);
      default:
        return state;
    }
  }, initialSoundSettings);

  const value = useMemo(
    () => ({ soundSettings, dispatch }),
    [soundSettings, dispatch],
  );
  return (
    <SoundSettingsContext.Provider value={value}>
      {children}
    </SoundSettingsContext.Provider>
  );
};
