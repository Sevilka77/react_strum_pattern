import { useContext } from "react";
import { ConfigContext } from "../app/providers/ConfigProvider";
export const useConfig = () => {
  return useContext(ConfigContext);
};
