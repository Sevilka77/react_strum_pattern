import { useContext } from "react";
import { ConfigContext } from "./ConfigProvider";
export const useConfig = () => {
  return useContext(ConfigContext);
};
