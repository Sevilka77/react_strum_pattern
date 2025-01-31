import { useContext } from "react";
import { BeatPatternContext } from "@/app/providers/BeatPatternProvider";
const useBeatPattern = () => {
  return useContext(BeatPatternContext);
};
export default useBeatPattern;
