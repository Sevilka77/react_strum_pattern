import { useContext } from "react";
import { CycleContext } from "../app/providers/CycleProvider";
export const useCycle = () => {
  return useContext(CycleContext);
};
