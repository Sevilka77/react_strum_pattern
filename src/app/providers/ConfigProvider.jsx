import { createContext, useReducer, useMemo } from "react";
import reducer from "./reducer";

// Создаем контекст
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, dispatch] = useReducer(reducer, {
    tempo: 70,
    noteSize: 4,
    isPlaying: false,
    isMetronomeSound: true,
    isBeatSound: false,
    isHitSound: true,
    noteDuration: "4n",
    clickAlways: false,
    clickMainBeat: true,
    clickSubbeat: false,
    clickTaktBeat: false,
    editMode: false,
    currentChord: "Em",
    repeatCount: 5,
  });

  // Мемоизируем значение контекста для предотвращения лишних рендеров
  const value = useMemo(() => ({ config, dispatch }), [config, dispatch]);
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
