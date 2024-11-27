import { Typography, AppBar, Toolbar, IconButton, Button } from "@mui/material";

import { memo, useCallback, useEffect } from "react";
import { MoveLeftIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = memo(function Header({ title }) {
  const location = useLocation(); // Получаем текущий путь

  // Функция для получения заголовка в зависимости от маршрута
  const getTitle = useCallback(() => {
    switch (location.pathname) {
      case "/":
        return "Онлайн тренажер гитарного боя"; // Заголовок для главной страницы
      case "/learn":
        return `${title}`;
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
            <Typography
              variant="h4"
              component="h1"
              color="#917AEA"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              {getTitle()}{" "}
            </Typography>
            <Button
              component={Link} // Используем Link для маршрутизации
              to="/pattern/0000"
              state={{ editMode: true }}
              sx={{
                backgroundColor: "#917AEA",
                "&:hover": {
                  backgroundColor: "#7d6bd2",
                },
              }}
              variant="contained"
            >
              Создать свой бой
            </Button>
          </>
        ) : (
          <>
            <IconButton
              aria-label="menu"
              color="#25111b"
              component={Link} // Используем Link для маршрутизации
              to="/"
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
