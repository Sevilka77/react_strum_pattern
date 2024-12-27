import Header from "../components/Header";
import { lazy, Suspense } from "react";

const MetronomeWrapper = lazy(() => import("../components/MetronomeWrapper"));

import { useConfig } from "../hooks/useConfig";
import { useEffect, useState } from "react";
import ControlFooter from "../components/ControlFooter";
import { learnPatterns } from "../provider/learnPatterns";
import { useCycle } from "../hooks/useCycle";
import { Container } from "@mui/material";
import LDJson from "../components/LDJson";

function LearnPage() {
  const { dispatch } = useConfig();
  const { cycleCount, resetCycle } = useCycle();
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const ldData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Тренажер гитарного боя",
    operatingSystem: "Все платформы",
    applicationCategory: "Музыкальный тренажер",
    url: "https://strumming.ru/learn",
    description:
      "Практикуйтесь в игре на гитаре с помощью онлайн тренажера гитарного боя на Strumming.ru.",

    potentialAction: {
      "@type": "ExerciseAction",
      target: "https://strumming.ru/learn",
      name: "Начать тренировку",
    },
  };

  useEffect(() => {
    const firstPattern = learnPatterns[0];
    if (firstPattern) {
      dispatch({ type: "setBeatPattern", data: firstPattern.pattern });
      dispatch({ type: "setNoteDuration", data: firstPattern.note });
      dispatch({ type: "setTempo", data: firstPattern.temp });
    }

    // Очистка состояния при размонтировании компонента, если нужно
    return () => {
      dispatch({ type: "clearPattern" }); // Сбрасываем паттерн
    };
  }, [dispatch]); // Обязательно добавляем зависимости

  useEffect(() => {
    if (cycleCount >= 5) {
      resetCycle(); // Сбросить счётчик

      // Переключаемся на следующий паттерн
      const nextIndex = (currentPatternIndex + 1) % learnPatterns.length; // Цикличность
      const nextPattern = learnPatterns[nextIndex];

      if (nextPattern) {
        setCurrentPatternIndex(nextIndex); // Обновляем текущий индекс
        dispatch({ type: "setBeatPattern", data: nextPattern.pattern }); // Обновляем паттерн
      }
    }
  }, [cycleCount, resetCycle, currentPatternIndex, dispatch]);

  return (
    <>
      <LDJson data={ldData} />
      <Header />
      <Container
        component="main"
        sx={{
          display: "flex",
          minHeight: "80dvh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="xl"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <MetronomeWrapper />
        </Suspense>
        <ControlFooter />
      </Container>
    </>
  );
}

export default LearnPage;
