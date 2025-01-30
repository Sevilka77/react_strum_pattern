import { useContext, useMemo } from "react";

import { ConfigContext } from "../app/providers/ConfigProvider";

export const useConfigSelector = (selector) => {
  const { config, dispatch } = useContext(ConfigContext);

  // Вычисляем нужное состояние
  const selectedState = useMemo(() => selector(config), [config, selector]);

  return [selectedState, dispatch];
};
