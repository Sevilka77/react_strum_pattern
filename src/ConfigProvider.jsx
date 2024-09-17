import { createContext, useReducer } from "react";
import reducer from "./reducer";

// Создаем контекст
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, dispatch] = useReducer(reducer, {
    beatPattern: "1101",
    tempo: 60,
    noteSize: 4,
    isPlaying: false,
    isMetronomeSound: true,
    isBeatSound: false,
    isDownbeatSound: true,
    isUpbeatClickSound: false,
  });

  return (
    <ConfigContext.Provider value={{ config, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
};
