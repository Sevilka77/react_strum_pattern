import Header from "../components/Header";
import { useLocation, useParams } from "react-router-dom";
import MetronomeWrapper from "../components/MetronomeWrapper";
import PatternEdit from "../components/PatternEdit";
import { Box } from "@mui/material";
import { useConfig } from "../useConfig";
import { useEffect, useState } from "react";
import ControlFooter from "../components/ControlFooter"; // Исправлено имя компонента
import { patterns } from "../patterns";

function PatternPage() {
  const location = useLocation();
  const { beatPattern } = useParams();
  const { config, dispatch } = useConfig();
  const p = location.state;
  const [title, setTitle] = useState("Выбор боя");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (p && p.editMode) {
      setEdit(true);
    }
    if (p) {
      setTitle(p.title || "Создание пользовательского боя");
      dispatch({ type: "setBeatPattern", data: p.pattern });
    } else if (beatPattern) {
      const foundPattern = patterns.find(
        (pattern) => pattern.pattern === beatPattern,
      );

      if (foundPattern) {
        setTitle(foundPattern.title || "Выбор боя"); // Заголовок по умолчанию
        dispatch({ type: "setBeatPattern", data: foundPattern.pattern });
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
    <Box display="flex" flexDirection="column" height="100vh">
      {/* Основной контейнер с флекс-расположением */}
      <Header title={title} />
      <Box
        display="flex"
        flexGrow={1} // Занимает оставшееся пространство между Header и футером
        justifyContent="center" // Центрируем содержимое по горизонтали
        alignItems="center" // Центрируем содержимое по вертикали
        sx={{ pb: 3 }} // Отступ снизу, если нужно
      >
        <MetronomeWrapper />
      </Box>
      {edit && (
        <PatternEdit beatPattern={config.beatPattern} dispatch={dispatch} />
      )}
      <ControlFooter />
    </Box>
  );
}

export default PatternPage;