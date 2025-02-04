import { createContext, useReducer, useMemo } from "react";
import { initialCycleSettings } from "./cycleSettingsTypes";

export const CycleSettingsContext = createContext();

export const CycleSettingsProvider = ({ children }) => {
  const [cycleSettings, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "INCREMENT_CYCLE":
        return { ...state, cycleCount: state.cycleCount + 1 };
      case "RESET_CYCLE":
        return { ...state, cycleCount: 0 };
      case "SET_ACTIVE_BEAT":
        return { ...state, activeBeat: action.payload };
      default:
        return state;
    }
  }, initialCycleSettings);

  const value = useMemo(
    () => ({ cycleSettings, dispatch }),
    [cycleSettings, dispatch],
  );

  return (
    <CycleSettingsContext.Provider value={value}>
      {children}
    </CycleSettingsContext.Provider>
  );
};
