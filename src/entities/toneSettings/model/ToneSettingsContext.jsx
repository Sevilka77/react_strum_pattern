import { createContext, useReducer, useMemo } from "react";
import { initialToneSettings } from "./toneSettingsTypes";

export const ToneSettingsContext = createContext();

const setNoteDuration = (state, noteDuration) => {
  if (noteDuration === undefined) return state;
  return { ...state, noteDuration };
};

const setIsPlaying = (state, isPlaying) => ({ ...state, isPlaying });
const setTempo = (state, tempo) => {
  if (tempo === undefined) return state;
  const newTempo = Math.max(40, Math.min(300, tempo));
  return { ...state, tempo: newTempo };
};

export const ToneSettingsProvider = ({ children }) => {
  const [toneSettings, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_TEMPO":
        return setTempo(state, action.payload);
      case "SET_NOTE_DURATION":
        return setNoteDuration(state, action.payload);
      case "SET_IS_PLAYING":
        return setIsPlaying(state, action.payload);
      default:
        return state;
    }
  }, initialToneSettings);

  const value = useMemo(
    () => ({ toneSettings, dispatch }),
    [toneSettings, dispatch],
  );
  return (
    <ToneSettingsContext.Provider value={value}>
      {children}
    </ToneSettingsContext.Provider>
  );
};
