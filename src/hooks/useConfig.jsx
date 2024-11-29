import { useContext } from "react";
import { ConfigContext } from "../provider/ConfigProvider";
export const useConfig = () => {
  return useContext(ConfigContext);
};
