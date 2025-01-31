import { createContext, useState } from "react";

// Контекст для отслеживания количества циклов и активного бита
export const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [cycleCount, setCycleCount] = useState(0); // Счетчик циклов
  const [activeBeat, setBeat] = useState(null); // Текущий активный бит

  // Функция для увеличения счетчика циклов
  const incrementCycle = () => {
    setCycleCount((prevCount) => prevCount + 1);
  };

  // Функция для сброса счетчика циклов
  const resetCycle = () => {
    setCycleCount(0); // Сбрасываем счетчик на 0
  };

  // Функция для установки активного бита
  const setActiveBeat = (beatIndex) => {
    setBeat(beatIndex); // Устанавливаем активный бит
  };

  return (
    <CycleContext.Provider
      value={{
        cycleCount,
        incrementCycle,
        resetCycle,
        activeBeat,
        setActiveBeat, // Передаем управление активным битом
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
