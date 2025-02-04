import { createContext, useReducer, useMemo } from "react";
import reducer from "./reducer";

// Создаем контекст
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, dispatch] = useReducer(reducer, {
    editMode: false,
  });

  // Мемоизируем значение контекста для предотвращения лишних рендеров
  const value = useMemo(() => ({ config, dispatch }), [config, dispatch]);
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
