import Header from "../features/header";
import { lazy, Suspense, useCallback } from "react";
import TopBarLoader from "@/shared/ui/TopBarLoader";

const MetronomeWrapper = lazy(() =>
  import("@/widgets/metronomePlayer").then((module) => ({
    default: module.MetronomePlayer,
  }))
);

import { useEffect, useState } from "react";
import ControlFooter from "@/features/metronome/ui/ControlFooter";
import { learnPatterns } from "@/app/providers/learnPatterns";
import { useCycleSettings } from "@/entities/cycleSettings/lib/useCycleSettings";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import { useSequenceSettings } from "@/entities/sequenceSettings/lib/useSequenceSettings";
import { IconButton, Button, Container, Typography } from "@mui/material";
import LDJson from "../components/LDJson";
import { Box, Stack } from "@mui/system";
import { Plus, Minus, SkipBack, SkipForward } from "@phosphor-icons/react";

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
    [seqDispatch, toneDispatch]
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

  const prevButton = (
    <IconButton
      sx={{
        borderRadius: "50%",
      }}
      onClick={goToPreviousLesson}
    >
      <SkipBack size={16} />
    </IconButton>
  );
  const nextButton = (
    <IconButton
      sx={{
        borderRadius: "50%",
      }}
      onClick={goToNextLesson}
    >
      <SkipForward size={16} />
    </IconButton>
  );

  const settingsSlot = (
    <Box
      sx={{
        display: "flex",
        direction: "row",
        justifyContent: "center",
        width: "100%",
        flexWrap: "wrap",
        gap: 1,
        mt: 1,
      }}
    >
      {autoNext ? (
        <>
          <Button variant="h6" onClick={() => setAutoNext(false)}>
            Выключить
          </Button>
          <IconButton
            sx={{
              borderRadius: "50%",
            }}
            onClick={() => setRepeatCount((prev) => Math.max(1, prev - 1))}
          >
            <Minus size={16} />
          </IconButton>

          <Stack justifyContent="center">
            <Typography
              sx={{ width: "40px", minWidth: "40px" }}
              alignSelf="center"
              textAlign="center"
            >
              {repeatCount}
            </Typography>
            <Typography fontSize="11px" alignSelf="center" textAlign="center">
              повторений
            </Typography>
          </Stack>
          <IconButton
            sx={{
              borderRadius: "50%",
            }}
            onClick={() => setRepeatCount((prev) => Math.min(100, prev + 1))}
          >
            <Plus size={16} />
          </IconButton>
        </>
      ) : (
        <Button variant="h6" onClick={() => setAutoNext(true)}>
          Авто переключение
        </Button>
      )}
    </Box>
  );
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="xl"
      >
        <Suspense fallback={<TopBarLoader />}>
          <MetronomeWrapper />
        </Suspense>

        <ControlFooter
          nextButton={nextButton}
          prevButton={prevButton}
          settingsSlot={settingsSlot}
        ></ControlFooter>
      </Container>
    </>
  );
}

export default LearnPage;
