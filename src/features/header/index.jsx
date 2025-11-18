import { Typography, AppBar, Toolbar, IconButton, Avatar } from "@mui/material";

import { memo, useMemo, useEffect } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useLocation, matchPath, useNavigate } from "react-router-dom";

import SettingsDialog from "@/features/tone/ui/Settings.jsx";
import { Stack } from "@mui/system";
import { getPageHeader } from "./Header.util";

import { TelegramLogo } from "@phosphor-icons/react";

const Header = memo(function Header({ title }) {
  const location = useLocation(); // Получаем текущий путь
  const { pathname } = location;
  const navigate = useNavigate();

  const pageHeader = useMemo(
    () => getPageHeader(location.pathname, title),
    [location.pathname, title]
  );

  const shouldShowSeetingsIcon =
    matchPath("//pattern/:beatPattern", pathname) ||
    matchPath("/learn", pathname) ||
    matchPath("/create", pathname) ||
    matchPath("/rhythm", pathname);

  return (
    <AppBar
      position="sticky"
      variant="outlined"
      elevation={0}
      sx={{ top: 0, pt: 1 }}
    >
      <Toolbar>
        {/* Если мы на главной странице, отображаем только /* Онлайн тренажер гитарного боя */}
        {location.pathname === "/" ? (
          <>
            <Stack direction="row" alignItems="center">
              <Avatar
                src="../favicon-32x32.png"
                alt="Logo"
                onClick={() => navigate("/")}
              />
              <Typography
                variant="h4"
                component="h3"
                align="center"
                fontWeight={700}
                flexGrow="1"
                px={2}
                style={{
                  background:
                    "linear-gradient(.287turn, #3d4ff7 10.46%, #c145ed 50.38%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Strumming.ru
              </Typography>
            </Stack>
            <IconButton
              component="a"
              href="https://t.me/+v5HFvtdzhgUyOWYy"
              target="_blank"
              rel="noopener noreferrer"
              sx={(theme) => ({
                position: "absolute",
                right: 8,
              })}
            >
              <TelegramLogo size={32} />
            </IconButton>
          </>
        ) : (
          <>
            <Avatar
              src="../favicon-32x32.png"
              alt="Logo"
              onClick={() => navigate("/")}
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              flexGrow="1"
            >
              <IconButton
                aria-label="menu"
                sx={{ mr: 1 }}
                onClick={() => navigate(-1)}
              >
                <ArrowLeft />
              </IconButton>

              <Typography
                variant="h5"
                component="h1"
                align="center"
                flexGrow="1"
              >
                {pageHeader}
              </Typography>
            </Stack>
            <IconButton aria-label="menu">
              {shouldShowSeetingsIcon && <SettingsDialog />}
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Header;
