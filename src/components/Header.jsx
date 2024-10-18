import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";

import { memo, useCallback, useEffect } from "react";
import { MoveLeftIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = memo(function Header({ title }) {
  const location = useLocation(); // Получаем текущий путь
  const navigate = useNavigate();

  // Функция для получения заголовка в зависимости от маршрута
  const getTitle = useCallback(() => {
    switch (location.pathname) {
      case "/":
        return "Онлайн тренажер гитарного боя"; // Заголовок для главной страницы
      default:
        return `Текущий бой: ${title}`; // Название по умолчанию
    }
  }, [location.pathname, title]);

  useEffect(() => {
    document.title = getTitle();
  }, [getTitle, location.pathname]); // Обновляем заголовок при изменении пути

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        {/* Если мы на главной странице, отображаем только заголовок */}
        {location.pathname === "/" ? (
          <Typography
            variant="h6"
            component="h1"
            color="#ffffff"
            align="center"
            sx={{ flexGrow: 1 }}
          >
            {getTitle()}{" "}
          </Typography>
        ) : (
          <>
            <IconButton
              aria-label="menu"
              color="#25111b"
              onClick={() => navigate(`/`)}
            >
              <MoveLeftIcon color="#25111b" />
            </IconButton>

            <Typography
              variant="h6"
              color="#25111b"
              align="center"
              component="h1"
              sx={{ flexGrow: 1 }}
            >
              {getTitle()} {/* Заголовок для других страниц */}
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Header;
