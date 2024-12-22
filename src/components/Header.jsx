import { Typography, AppBar, Toolbar, IconButton, Avatar } from "@mui/material";

import { memo, useCallback, useEffect } from "react";
import { MoveLeftIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = memo(function Header({ title }) {
  const location = useLocation(); // Получаем текущий путь
  const navigate = useNavigate();

  // Функция для получения заголовка в зависимости от маршрута
  const getTitle = useCallback(() => {
    switch (location.pathname) {
      case "/":
        return "Онлайн тренажер гитарного боя"; // Заголовок для главной страницы
      case "/learn":
        return `Тренировка гитарного боя`;
      case "/create":
        return `${title}`;
      case "/patterns":
        return `Основные гитарные бои`;
      case "/custom":
        return `Пользовтательские гитарные бои`;
      default:
        return `Текущий бой: ${title}`; // Название по умолчанию
    }
  }, [location.pathname, title]);

  useEffect(() => {
    document.title = getTitle();
  }, [getTitle, location.pathname]); // Обновляем заголовок при изменении пути

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{ top: 0, left: 0, right: 0 }}
    >
      <Toolbar variant="dense">
        {/* Если мы на главной странице, отображаем только /* Онлайн тренажер гитарного боя */}
        {location.pathname === "/" ? (
          <>{}</>
        ) : (
          <>
            <Avatar
              src="../favicon-32x32.png"
              alt="Logo"
              onClick={() => navigate("/")}
            />

            <IconButton
              aria-label="menu"
              color="#25111b"
              onClick={() => navigate(-1)}
              variant="contained"
              sx={{ ml: 2 }}
            >
              <MoveLeftIcon />
            </IconButton>

            <Typography
              variant="h5"
              component="h1"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              {getTitle()}{" "}
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Header;
