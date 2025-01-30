import { Typography, AppBar, Toolbar, IconButton, Avatar } from "@mui/material";

import { memo, useMemo, useEffect } from "react";
import { MoveLeftIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SettingsDialog from "../../components/Settings";
import { Stack } from "@mui/system";
import { getPageTitle, getPageDescription, getPageHeader } from "./Header.util";

const Header = memo(function Header({ title }) {
  const location = useLocation(); // Получаем текущий путь
  const navigate = useNavigate();

  const pageTitle = useMemo(
    () => getPageTitle(location.pathname, title),
    [location.pathname, title],
  );
  const pageDescription = useMemo(
    () => getPageDescription(location.pathname, title),
    [location.pathname, title],
  );
  const pageHeader = useMemo(
    () => getPageHeader(location.pathname, title),
    [location.pathname, title],
  );

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
                {pageHeader}
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
