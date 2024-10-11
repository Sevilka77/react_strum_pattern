import { Typography, Box, AppBar, Toolbar, IconButton } from "@mui/material";

import { memo, useCallback, useEffect } from "react";
import { MoveLeftIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = memo(function Header() {
  const location = useLocation(); // Получаем текущий путь
  const navigate = useNavigate();

  // Функция для получения заголовка в зависимости от маршрута
  const getTitle = useCallback(() => {
    switch (location.pathname) {
      case "/":
        return "Strumming.ru - Онлайн тренажер гитарного боя"; // Заголовок для главной страницы
      // case "/pattern":
      //   return "Выбор паттерна"; // Заголовок для страницы паттерна
      // case "/pattern/somePattern": // Пример для конкретного паттерна
      //   return `Текущий паттерн: ${p.title}`; // Заголовок для страницы конкретного паттерна
      default:
        return `Текущий бой: ${location.state.title}`; // Название по умолчанию
    }
  }, [location]);

  useEffect(() => {
    document.title = getTitle();
  }, [getTitle, location.pathname]); // Обновляем заголовок при изменении пути

  return (
    <Box>
      <AppBar position="fixed" elevation={1}>
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Если мы на главной странице, отображаем только заголовок */}
          {location.pathname === "/" ? (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {getTitle()}{" "}
            </Typography>
          ) : (
            <>
              {/* Левый блок с тремя кнопками */}
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => navigate(`/`)}
                >
                  <MoveLeftIcon />
                </IconButton>
              </Box>
              {/* Центр с заголовком для других страниц */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {getTitle()} {/* Заголовок для других страниц */}
              </Typography>
            </>
          )}
          {/* Правый блок с кнопками About и ThemeToggle */}
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default Header;
