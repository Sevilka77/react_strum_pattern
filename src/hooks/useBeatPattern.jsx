import { useContext } from "react";
import { BeatPatternContext } from "@/app/providers/BeatPatternProvider";
export const useBeatPattern = () => {
  return useContext(BeatPatternContext);
};
