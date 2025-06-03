import Header from "@/features/header";
import { lazy, Suspense, useCallback } from "react";
import TopBarLoader from "@/shared/ui/TopBarLoader";
const MetronomeWrapper = lazy(() =>
  import("@/widgets/metronomePlayer").then((module) => ({
    default: module.MetronomePlayer,
  }))
);

import { useEffect, useState } from "react";
import ControlFooter from "@/features/metronome/ui/ControlFooter";
import { rhythmPatterns } from "@/app/providers/rhythmPatterns";
import { useCycleSettings } from "@/entities/cycleSettings/lib/useCycleSettings";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import { useSequenceSettings } from "@/entities/sequenceSettings/lib/useSequenceSettings";
import {
  Button,
  Container,
  FormControlLabel,
  Switch,
  IconButton,
  Typography,
} from "@mui/material";

import { Box, Stack } from "@mui/system";
import { Plus, Minus, SkipBack, SkipForward } from "@phosphor-icons/react";
import MetaData from "@/shared/lib/seo/MetaData";
const PatternList = lazy(() => import("./ui/PatternList"));

function RhythmPage() {
  const { cycleSettings, dispatch: cycleDispatch } = useCycleSettings();
  const { dispatch: toneDispatch } = useToneSettings();
  const { dispatch: seqDispatch } = useSequenceSettings();
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(5);
  const [autoNext, setAutoNext] = useState(false);
  const [randomNext, setRandomNext] = useState(false);
  const [pattenName, setPatternName] = useState();
  const [activePattern, setActivePattern] = useState(false);

  // Функция для перехода к предыдущему уроку
  const updatePattern = useCallback(
    (index) => {
      const pattern = rhythmPatterns[index];
      if (pattern) {
        setPatternName(pattern.title);
        seqDispatch({ type: "SET_BEAT_PATTERN", payload: pattern.pattern });
        toneDispatch({ type: "SET_NOTE_DURATION", payload: pattern.note });
      }
    },
    [seqDispatch, toneDispatch]
  );
  const onSelect = (pattern) => {
    setActivePattern(true);
    updatePattern(pattern);
  };
  const goToPreviousLesson = useCallback(() => {
    const previousIndex =
      (currentPatternIndex - 1 + rhythmPatterns.length) % rhythmPatterns.length; // Цикличность
    setCurrentPatternIndex(previousIndex);
    updatePattern(previousIndex);
  }, [currentPatternIndex, updatePattern]);

  const goToNextLesson = useCallback(() => {
    const nextIndex = (currentPatternIndex + 1) % rhythmPatterns.length; // Цикличность
    setCurrentPatternIndex(nextIndex);
    updatePattern(nextIndex);
  }, [currentPatternIndex, updatePattern]);
  const goToRandomLesson = useCallback(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * rhythmPatterns.length);
    } while (randomIndex === currentPatternIndex); // Исключаем повторение текущего индекса

    setCurrentPatternIndex(randomIndex);
    updatePattern(randomIndex);
  }, [currentPatternIndex, updatePattern]);

  useEffect(() => {
    const firstPattern = rhythmPatterns[0];
    if (firstPattern) {
      setPatternName(firstPattern.title);
      seqDispatch({ type: "SET_BEAT_PATTERN", payload: firstPattern.pattern });
      toneDispatch({ type: "SET_NOTE_DURATION", payload: firstPattern.note });
    }

    // Очистка состояния при размонтировании компонента, если нужно
    return;
  }, [seqDispatch, toneDispatch]); // Обязательно добавляем зависимости

  useEffect(() => {
    if (autoNext && cycleSettings.cycleCount == repeatCount) {
      cycleDispatch({ type: "RESET_CYCLE" });

      if (randomNext) {
        goToRandomLesson();
      } else {
        goToNextLesson();
      }
    }
  }, [
    repeatCount,
    autoNext,
    randomNext,
    goToNextLesson,
    goToRandomLesson,
    cycleSettings.cycleCount,
    cycleDispatch,
    cycleSettings,
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
            onClick={() =>
              setRepeatCount((prevValue) => Math.max(1, prevValue - 1))
            }
          >
            <Minus size={16} />
          </IconButton>

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
            <Typography fontSize="11px" alignSelf="center" textAlign="center">
              повторений
            </Typography>
          </Stack>
          <IconButton
            sx={{
              borderRadius: "50%",
            }}
            onClick={() =>
              setRepeatCount((prevValue) => Math.min(100, prevValue + 1))
            }
          >
            <Plus size={16} />
          </IconButton>
        </>
      ) : (
        <Button variant="h6" onClick={() => setAutoNext(true)}>
          Авто переключение
        </Button>
      )}
      {autoNext && (
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={randomNext}
              onChange={(e) => setRandomNext(e.target.checked)}
            />
          }
          label="Сллучайное переключение"
          labelPlacement="start"
          sx={{
            mt: 2,
            fontSize: "11px",
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
          }}
        />
      )}
    </Box>
  );

  return (
    <>
      <MetaData
        title="Практика ритмического алфавита – Развиваем чувство ритма | Strumming.ru"
        description="Погружаемся в практику ритмического алфавита: развиваем внутренний ритм, учимся свободно играть и чувствовать музыку. Шаг за шагом — к ритмической свободе!"
      />
      <Header />

      <Container
        component="main"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
        }}
        maxWidth="xl"
      >
        {!activePattern && (
          <PatternList patterns={rhythmPatterns} onSelect={onSelect} />
        )}{" "}
        {activePattern && (
          <Typography variant="h5" component="h3" align="center">
            {pattenName}
          </Typography>
        )}
        {activePattern && (
          <Suspense fallback={<TopBarLoader />}>
            <MetronomeWrapper />
          </Suspense>
        )}
        {activePattern && (
          <ControlFooter
            nextButton={nextButton}
            prevButton={prevButton}
            settingsSlot={settingsSlot}
          ></ControlFooter>
        )}
      </Container>
    </>
  );
}

export default RhythmPage;
