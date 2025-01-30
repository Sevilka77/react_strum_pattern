import { createContext, useMemo, useState } from "react";

export const BeatPatternContext = createContext();

export const BeatPatternProvider = ({ children }) => {
  const [beatPattern, setBeatPattern] = useState("1101");

  const updateBeatPattern = (newPattern) => {
    if (newPattern === undefined) return;
    setBeatPattern(newPattern); //
  };

  const value = useMemo(
    () => ({ beatPattern, updateBeatPattern }),
    [beatPattern],
  );
  return (
    <BeatPatternContext.Provider value={value}>
      {children}
    </BeatPatternContext.Provider>
  );
};
