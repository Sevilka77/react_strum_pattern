import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";

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
        return `${title}`;
      case "/create":
        return `${title}`;
      case "/patterns":
        return `Основные бои`;
      case "/custom":
        return `Пользовтательские бои`;
      default:
        return `Текущий бой: ${title}`; // Название по умолчанию
    }
  }, [location.pathname, title]);

  useEffect(() => {
    document.title = getTitle();
  }, [getTitle, location.pathname]); // Обновляем заголовок при изменении пути

  return (
    <AppBar
      position="absolute"
      color="transparent"
      sx={{ top: 0, left: 0, right: 0, boxShadow: "none" }}
    >
      <Toolbar variant="dense">
        {/* Если мы на главной странице, отображаем только /* Онлайн тренажер гитарного боя */}
        {location.pathname === "/" ? (
          <>
            {/* <Typography
              variant="h4"
              component="h1"
              color="#917AEA"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              {getTitle()}{" "}
            </Typography> */}
          </>
        ) : (
          <>
            <IconButton
              aria-label="menu"
              color="#25111b"
              onClick={() => navigate(-1)}
              variant="contained"
            >
              <MoveLeftIcon color="#816EDC" />
            </IconButton>

            <Typography
              variant="h4"
              component="h1"
              color="#917AEA"
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
