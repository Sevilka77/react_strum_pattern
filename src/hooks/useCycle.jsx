import { useContext } from "react";
import { CycleContext } from "../provider/CycleProvider";
export const useCycle = () => {
  return useContext(CycleContext);
};
