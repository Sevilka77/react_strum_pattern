import Header from "../components/Header";
import { lazy, Suspense } from "react";

const MetronomeWrapper = lazy(() => import("../components/MetronomeWrapper"));

import { useConfig } from "../useConfig";
import { useEffect, useState } from "react";
import ControlFooter from "../components/ControlFooter";
import { learnPatterns } from "../learnPatterns";
import { useCycle } from "../useCycle";
import { Snackbar, Typography } from "@mui/material";

function LearnPage() {
  const { dispatch } = useConfig();
  const { cycleCount, resetCycle } = useCycle();
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [title, setTitle] = useState("Выбор боя");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const firstPattern = learnPatterns[0];
    if (firstPattern) {
      setTitle(firstPattern.title || "Выбор боя");
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
        setTitle(nextPattern.title || "Выбор боя"); // Обновляем заголовок
        dispatch({ type: "setBeatPattern", data: nextPattern.pattern }); // Обновляем паттерн
      }
    }
  }, [cycleCount, resetCycle, currentPatternIndex, dispatch]);

  return (
    <>
      <Header title={title} />
      <Snackbar
        color="#0C0F2A"
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "top", // Вертикальное расположение (top, bottom)
          horizontal: "center", // Горизонтальное расположение (left, center, right)
        }}
        onClose={handleClose}
      >
        <Typography
          component="h2"
          variant="body1"
          color="#39F1FF"
          sx={{
            position: "relative",
            textShadow: `0 0 42px `,
            textAlign: "center",
          }}
        >
          Пройди {learnPatterns.length} упражнения, каждое из которых направлено
          на развитие разных аспектов ритма. Эти упражнения помогут тебе не
          только размяться, но и развить ощущение ритма.
        </Typography>
      </Snackbar>

      <Suspense fallback={<div>Загрузка...</div>}>
        <MetronomeWrapper />
      </Suspense>
      <ControlFooter />
    </>
  );
}

export default LearnPage;
