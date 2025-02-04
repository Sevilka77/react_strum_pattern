import { createContext, useReducer, useMemo } from "react";
import { initialSequenceSettings } from "./sequenceSettingsTypes";

export const SequenceSettingsContext = createContext();

const setBeatPattern = (state, pattern) => {
  if (pattern === undefined) return state;
  return { ...state, beatPattern: pattern };
};

export const SequenceSettingsProvider = ({ children }) => {
  const [sequenceSettings, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_BEAT_PATTERN":
        return setBeatPattern(state, action.payload);
      default:
        return state;
    }
  }, initialSequenceSettings);

  const value = useMemo(
    () => ({ sequenceSettings, dispatch }),
    [sequenceSettings, dispatch],
  );
  return (
    <SequenceSettingsContext.Provider value={value}>
      {children}
    </SequenceSettingsContext.Provider>
  );
};
