import Header from "../components/Header";
import { lazy, Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
const MetronomeWrapper = lazy(() => import("../components/MetronomeWrapper"));

import PatternEdit from "../components/PatternEdit";

import { useConfig } from "../hooks/useConfig";
import { useEffect, useState } from "react";
import ControlFooter from "../components/ControlFooter"; // Исправлено имя компонента
import { patterns } from "../provider/patterns";
import { Container } from "@mui/material";

function PatternPage() {
  const location = useLocation();
  const { beatPattern } = useParams();
  const { config, dispatch } = useConfig();
  const p = location.state;
  const [title, setTitle] = useState("Выбор боя");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (p) {
      if (p.editMode) {
        setEdit(true); // Устанавливаем режим редактирования, если editMode true
      }
      setTitle(p.title || "Пользовательский бой");
      dispatch({ type: "setBeatPattern", data: p.pattern });
      dispatch({ type: "setNoteDuration", data: p.note });
      dispatch({ type: "setTempo", data: p.temp });
    } else if (beatPattern) {
      const foundPattern = patterns.find(
        (pattern) => pattern.pattern === beatPattern,
      );

      if (foundPattern) {
        setTitle(foundPattern.title || "Выбор боя"); // Заголовок по умолчанию
        dispatch({ type: "setBeatPattern", data: foundPattern.pattern });
        dispatch({ type: "setNoteDuration", data: foundPattern.note });
        dispatch({ type: "setTempo", data: foundPattern.temp });
      } else {
        console.log("Паттерн не найден в массиве patterns.");
        setTitle("Пользовательский бой");
        dispatch({ type: "setBeatPattern", data: beatPattern });
      }
    } else {
      console.log("Pattern не передан, используется значение по умолчанию");
      dispatch({ type: "setBeatPattern", data: config.defaultPattern });
    }

    // Очистка состояния при размонтировании компонента, если нужно
    return () => {
      dispatch({ type: "clearPattern" }); // Сбрасываем паттерн
    };
  }, [dispatch, p, beatPattern, config.defaultPattern]); // Обязательно добавляем зависимости

  return (
    <>
      <Header title={title} />
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
        {edit && (
          <PatternEdit beatPattern={config.beatPattern} dispatch={dispatch} />
        )}
        {/* <VolumeControls /> */}
        <ControlFooter />
      </Container>
    </>
  );
}

export default PatternPage;
