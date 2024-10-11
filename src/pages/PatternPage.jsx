import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import MetronomeWrapper from "../components/MetronomeWrapper";
import { Box } from "@mui/material";
import { useConfig } from "../useConfig";
import { useEffect } from "react";
import ControlFooter from "../components/ConrolFooter";

function PatternPage() {
  const location = useLocation();
  // Если нужно будет перенаправление
  const { config, dispatch } = useConfig();
  const p = location.state;

  useEffect(() => {
    if (p) {
      // Если объект pattern передан, используем его
      dispatch({ type: "setBeatPattern", data: p.pattern });
    } else {
      console.log("Pattern не передан, используется значение по умолчанию");
      // Установите значение по умолчанию, если это необходимо
      dispatch({ type: "setBeatPattern", data: config.defaultPattern }); // Укажите значение по умолчанию
    }

    // Не забудьте очистить состояние или что-то еще, если это необходимо при размонтировании
  }, [dispatch, p, config.defaultPattern]); // Обязательно добавьте все зависимости

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* Основной контейнер с флекс-расположением */}
      <Header />
      <Box
        display="flex"
        flexGrow={1} // Занимает оставшееся пространство между Header и футером
        justifyContent="center" // Центрируем содержимое по горизонтали
        alignItems="center" // Центрируем содержимое по вертикали
        sx={{ pb: 3 }} // Отступ снизу, если нужно
      >
        <MetronomeWrapper />
      </Box>
      <ControlFooter />
    </Box>
  );
}

export default PatternPage;
