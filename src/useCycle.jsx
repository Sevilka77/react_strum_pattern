import { useContext } from "react";
import { CycleContext } from "./CycleProvider";
export const useCycle = () => {
  return useContext(CycleContext);
};
