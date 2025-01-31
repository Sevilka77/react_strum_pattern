import { useContext, useMemo } from "react";

import { ConfigContext } from "@/app/providers/ConfigProvider";

const useConfigSelector = (selector) => {
  const { config, dispatch } = useContext(ConfigContext);

  // Вычисляем нужное состояние
  const selectedState = useMemo(() => selector(config), [config, selector]);

  return [selectedState, dispatch];
};
export default useConfigSelector;
