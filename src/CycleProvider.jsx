import { createContext, useState } from "react";

// Контекст для отслеживания количества циклов
export const CycleContext = createContext();
export const CycleProvider = ({ children }) => {
  const [cycleCount, setCycleCount] = useState(0); // Счетчик циклов

  // Функция для увеличения счетчика циклов
  const incrementCycle = () => {
    setCycleCount((prevCount) => prevCount + 1);
  };

  // Функция для сброса счетчика циклов
  const resetCycle = () => {
    setCycleCount(0); // Сбрасываем счетчик на 0
  };

  return (
    <CycleContext.Provider value={{ cycleCount, incrementCycle, resetCycle }}>
      {children}
    </CycleContext.Provider>
  );
};
