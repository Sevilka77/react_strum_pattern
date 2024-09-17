import { Typography, Box, AppBar, Toolbar, IconButton } from "@mui/material";
import ButtonShare from "./ButtonShare.jsx";
import ButtonPatternList from "./ButtonPatternList.jsx";
import ButtonPatternEdit from "./ButtonPatternEdit.jsx";
import ButtonThemeToggle from "./ButtonThemeToggle";
import About from "./About";
import { memo } from "react";
import { SettingsIcon } from "lucide-react";

const Header = memo(function Header({
  dispatch,
  beatPattern,
  handleTogglePB,
  isSmallDevice,
  onOpenModalSettings,
}) {
  return (
    <Box sx={{ gridArea: "header", flexGrow: 1 }}>
      <AppBar position="static" elevation={1} enableColorOnDark>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Левый блок с тремя кнопками */}
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              gap: "10px",
              justifyContent: isSmallDevice ? "space-around" : "flex-start",
            }}
          >
            <ButtonPatternList
              sx={{
                borderRadius: "8px",
              }}
              isSmallDevice={isSmallDevice}
              dispatch={dispatch}
            />
            <ButtonPatternEdit
              sx={{
                borderRadius: "8px",
              }}
              isSmallDevice={isSmallDevice}
              onChanged={handleTogglePB}
            />
            <ButtonShare
              sx={{
                borderRadius: "8px",
              }}
              beatPattern={beatPattern}
              isSmallDevice={isSmallDevice}
            />
            {isSmallDevice && (
              <IconButton onClick={onOpenModalSettings} color="inherit">
                <SettingsIcon />
              </IconButton>
            )}
          </Box>
          {/* Центр с заголовком */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute", // Абсолютное позиционирование
              left: "50%", // Центр по горизонтали
              transform: "translateX(-50%)", // Смещение на половину ширины текста
              textAlign: "center",
              display: isSmallDevice ? "none" : "block", // Скрываем заголовок на маленьких экранах
            }}
          >
            Тренажер Гитарного Боя
          </Typography>
          {/* Правый блок с кнопками About и ThemeToggle */}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <About color="inherit" />
            <ButtonThemeToggle color="inherit" />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default Header;
