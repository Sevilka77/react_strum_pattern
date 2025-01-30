import Header from "../components/Header";
import { lazy, Suspense, useCallback } from "react";

const MetronomeWrapper = lazy(() => import("../components/MetronomeWrapper"));

import { useConfig } from "../hooks/useConfig";
import { useEffect, useState } from "react";
import ControlFooter from "../components/ControlFooter";
import { learnPatterns } from "../app/providers/learnPatterns";
import { useCycle } from "../hooks/useCycle";
import { Button, Container, Typography } from "@mui/material";
import LDJson from "../components/LDJson";
import { Box, Stack } from "@mui/system";
import { Minus, Plus } from "lucide-react";

function LearnPage() {
  const { dispatch } = useConfig();
  const { cycleCount, resetCycle } = useCycle();
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(5);
  const [autoNext, setAutoNext] = useState(false);
  const [pattenName, setPatternName] = useState();

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

  // Функция для перехода к предыдущему уроку
  const updatePattern = useCallback(
    (index) => {
      const pattern = learnPatterns[index];
      if (pattern) {
        setPatternName(pattern.title);
        dispatch({ type: "setBeatPattern", data: pattern.pattern });
        dispatch({ type: "setNoteDuration", data: pattern.note });
        dispatch({ type: "setTempo", data: pattern.temp });
      }
    },
    [dispatch],
  );

  const goToPreviousLesson = useCallback(() => {
    const previousIndex =
      (currentPatternIndex - 1 + learnPatterns.length) % learnPatterns.length; // Цикличность
    setCurrentPatternIndex(previousIndex);
    updatePattern(previousIndex);
  }, [currentPatternIndex, updatePattern]);

  const goToNextLesson = useCallback(() => {
    const nextIndex = (currentPatternIndex + 1) % learnPatterns.length; // Цикличность
    setCurrentPatternIndex(nextIndex);
    updatePattern(nextIndex);
  }, [currentPatternIndex, updatePattern]);

  useEffect(() => {
    const firstPattern = learnPatterns[0];
    if (firstPattern) {
      setPatternName(firstPattern.title);
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
    if (autoNext && cycleCount >= repeatCount) {
      resetCycle();
      goToNextLesson();
    }
  }, [cycleCount, resetCycle, repeatCount, autoNext, goToNextLesson]);

  return (
    <>
      <LDJson data={ldData} />
      <Header />
      <Typography variant="h5" component="h3" align="center" flexGrow="1">
        {pattenName}
      </Typography>
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

        <ControlFooter>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "center",
            }}
          >
            <Button variant="h6" onClick={goToPreviousLesson}>
              Предыдущий урок
            </Button>
            {autoNext ? (
              <>
                <Button variant="h6" onClick={() => setAutoNext(false)}>
                  Выключить
                </Button>
                <Button
                  sx={{
                    color: "#FFFFFF",
                    width: "40px",
                    minWidth: "40px",
                    px: 0,
                  }}
                  onClick={() =>
                    setRepeatCount((prevValue) => Math.max(1, prevValue - 1))
                  }
                >
                  <Minus />
                </Button>
                <Stack justifyContent="center">
                  <Typography
                    sx={{
                      width: "40px",
                      minWidth: "40px",
                    }}
                    alignSelf="center"
                    textAlign="center"
                  >
                    {repeatCount}
                  </Typography>
                  <Typography
                    fontSize="11px"
                    alignSelf="center"
                    textAlign="center"
                    s
                  >
                    повторений
                  </Typography>
                </Stack>
                <Button
                  sx={{
                    color: "#FFFFFF",
                    width: "40px",
                    minWidth: "40px",
                    px: 0,
                  }}
                  onClick={() =>
                    setRepeatCount((prevValue) => Math.min(100, prevValue + 1))
                  }
                >
                  <Plus />
                </Button>
              </>
            ) : (
              <Button variant="h6" onClick={() => setAutoNext(true)}>
                Авто переключение
              </Button>
            )}
            <Button variant="h6" onClick={goToNextLesson}>
              Следующий урок
            </Button>
          </Box>
        </ControlFooter>
      </Container>
    </>
  );
}

export default LearnPage;
