import { useContext } from "react";
import { CycleContext } from "../app/providers/CycleProvider";

const useCycle = () => {
  return useContext(CycleContext);
};
export default useCycle;
