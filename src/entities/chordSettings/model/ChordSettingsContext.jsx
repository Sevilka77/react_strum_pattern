// entities/chordSettings/model/ChordSettingsContext.js
import { createContext, useReducer, useMemo } from "react";
import { initialChordSettings } from "./chordSettingsTypes";

export const ChordSettingsContext = createContext();

const setCurrentChord = (state, currentChord) => ({ ...state, currentChord });

export const ChordSettingsProvider = ({ children }) => {
  const [chordSettings, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "setCurrentChord":
        return setCurrentChord(state, action.payload);
      default:
        return state;
    }
  }, initialChordSettings);

  const value = useMemo(
    () => ({ chordSettings, dispatch }),
    [chordSettings, dispatch],
  );
  return (
    <ChordSettingsContext.Provider value={value}>
      {children}
    </ChordSettingsContext.Provider>
  );
};
