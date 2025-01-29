import { Typography, AppBar, Toolbar, IconButton, Avatar } from "@mui/material";

import { memo, useMemo, useEffect } from "react";
import { MoveLeftIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SettingsDialog from "./Settings";
import { Stack } from "@mui/system";

const Header = memo(function Header({ title }) {
  const location = useLocation(); // Получаем текущий путь
  const navigate = useNavigate();

  // Функция для получения заголовка в зависимости от маршрута
  const pageTitle = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "Strumming.ru – Гитарный бой онлайн: тренажер, схемы и упражнения"; // Заголовок для главной страницы
      case "/learn":
        return `Уроки гитарного боя – Учись играть с нуля на Strumming.ru`;
      case "/create":
        return `Создай свой гитарный бой – Уникальный конструктор на Strumming.ru`;
      case "/patterns":
        return `Схемы основных гитарных боев – Шестерка, Восьмерка, Галоп и другие – Strumming.ru`;
      case "/custom":
        return `Пользовательские гитарные бои – Идеи и ритмы от сообщества – Strumming.ru`;
      default:
        return `Гитарный бой ${title} – Схема и тренировка – Strumming.ru `;
    }
  }, [location.pathname, title]);

  const getPageHeader = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "Strumming - Онлайн тренажер гитарного боя";
      case "/learn":
        return "Уроки гитарного боя";
      case "/create":
        return "Создание гитарного боя";
      case "/patterns":
        return "Схемы гитарных боев";
      case "/custom":
        return "Пользовательские гитарные бои";
      default:
        return `Гитарный бой - ${title}`;
    }
  }, [location.pathname, title]);
  const pageDescription = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "Уникальный тренажер для изучения гитарного боя с подробными схемами и упражнениями.";
      case "/learn":
        return "Уроки для начинающих и опытных музыкантов по техникам гитарного боя.";
      case "/create":
        return "Создайте свой собственный гитарный бой с помощью нашего конструктора.";
      case "/patterns":
        return "Изучите различные схемы гитарных боев, такие как Шестерка, Восьмерка, Галоп и другие.";
      case "/custom":
        return "Откройте для себя пользовательские гитарные бои и ритмы от сообщества Strumming.ru.";
      default:
        return `Схема гитарного боя- ${title} — Тренировка и советы по технике.`;
    }
  }, [location.pathname, title]);

  useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageDescription);
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute("content", pageDescription);
      document.head.appendChild(newMetaDescription);
    }
  }, [pageTitle, pageDescription]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{ top: 0, pt: 1 }}
    >
      <Toolbar>
        {/* Если мы на главной странице, отображаем только /* Онлайн тренажер гитарного боя */}
        {location.pathname === "/" ? (
          <></>
        ) : (
          <>
            <IconButton
              aria-label="menu"
              color="#25111b"
              sx={{ mr: 1 }}
              onClick={() => navigate(-1)}
            >
              <MoveLeftIcon />
            </IconButton>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              flexGrow="1"
            >
              <Avatar
                src="../favicon-32x32.png"
                alt="Logo"
                onClick={() => navigate("/")}
              />
              <Typography
                variant="h5"
                component="h1"
                align="center"
                flexGrow="1"
              >
                {getPageHeader}
              </Typography>
            </Stack>
            <IconButton aria-label="menu" color="#25111b">
              <SettingsDialog />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Header;
