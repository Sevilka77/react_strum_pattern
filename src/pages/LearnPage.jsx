import Header from "../features/header";
import { lazy, Suspense, useCallback } from "react";

const MetronomeWrapper = lazy(() =>
  import("@/widgets/metronomePlayer").then((module) => ({
    default: module.MetronomePlayer,
  })),
);

import { useEffect, useState } from "react";
import ControlFooter from "@/features/metronome/ui/ControlFooter";
import { learnPatterns } from "@/app/providers/learnPatterns";
import { useCycleSettings } from "@/entities/cycleSettings/lib/useCycleSettings";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import { useSequenceSettings } from "@/entities/sequenceSettings/lib/useSequenceSettings";
import { Button, Container, Typography } from "@mui/material";
import LDJson from "../components/LDJson";
import { Box, Stack } from "@mui/system";
import { Minus, Plus } from "lucide-react";

function LearnPage() {
  const { cycleSettings, dispatch: cycleDispatch } = useCycleSettings();
  const { dispatch: toneDispatch } = useToneSettings();
  const { dispatch: seqDispatch } = useSequenceSettings();
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
        seqDispatch({ type: "SET_BEAT_PATTERN", payload: pattern.pattern });
        toneDispatch({ type: "SET_NOTE_DURATION", payload: pattern.note });
        toneDispatch({ type: "SET_TEMPO", payload: pattern.temp });
      }
    },
    [seqDispatch, toneDispatch],
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
      seqDispatch({ type: "SET_BEAT_PATTERN", payload: firstPattern.pattern });
      toneDispatch({ type: "SET_NOTE_DURATION", payload: firstPattern.note });
      toneDispatch({ type: "SET_TEMPO", payload: firstPattern.temp });
    }

    // Очистка состояния при размонтировании компонента, если нужно
    return;
  }, [seqDispatch, toneDispatch]); // Обязательно добавляем зависимости

  useEffect(() => {
    if (autoNext && cycleSettings.cycleCount >= repeatCount) {
      cycleDispatch({ type: "RESET_CYCLE" });
      goToNextLesson();
    }
  }, [
    repeatCount,
    autoNext,
    goToNextLesson,
    cycleSettings.cycleCount,
    cycleDispatch,
  ]);

  return (
    <>
      <LDJson data={ldData} />
      <Header />
      <Typography variant="h5" component="h3" align="center">
        {pattenName}
      </Typography>
      <Container
        component="main"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="xl"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <MetronomeWrapper />
        </Suspense>
        <Box
          sx={{
            display: "flex",
            direction: "row",
            justifyContent: "center",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="h6"
            sx={{ minWidth: "140px" }}
            onClick={goToPreviousLesson}
          >
            Предыдущая буква
          </Button>
          <Button
            variant="h6"
            sx={{ minWidth: "140px" }}
            onClick={goToNextLesson}
          >
            Следующая буква
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
        </Box>
        <ControlFooter />
      </Container>
    </>
  );
}

export default LearnPage;
