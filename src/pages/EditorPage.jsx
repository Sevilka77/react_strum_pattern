import Header from "../components/Header";
import { lazy, Suspense } from "react";

const MetronomeWrapper = lazy(() => import("../components/MetronomeWrapper"));

import { useConfig } from "../hooks/useConfig";
import { useEffect } from "react";
import ControlFooter from "../components/ControlFooter";
import { learnPatterns } from "../provider/learnPatterns";

import PatternEdit from "../components/PatternEdit";
import { Container } from "@mui/material";

function EditorPage() {
  const { config, dispatch } = useConfig();

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

  return (
    <>
      <Header title={"Рекдактор боя"} />
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

        <PatternEdit beatPattern={config.beatPattern} dispatch={dispatch} />

        <ControlFooter />
      </Container>
    </>
  );
}

export default EditorPage;
