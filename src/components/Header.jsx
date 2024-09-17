import { Typography, Box, AppBar, Toolbar } from "@mui/material";
import ButtonShare from "./ButtonShare.jsx";
import ButtonPatternList from "./ButtonPatternList.jsx";
import ButtonPatternEdit from "./ButtonPatternEdit.jsx";
import ButtonThemeToggle from "./ButtonThemeToggle";
import About from "./About";
import { memo } from "react";

const Header = memo(function Header({ dispatch, config, handleTogglePB }) {
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
          <Box sx={{ display: "flex", gap: "10px" }}>
            <ButtonPatternList
              sx={{
                borderRadius: "8px",
                bgcolor: "background.paper",
              }}
              dispatch={dispatch}
            />
            <ButtonPatternEdit
              sx={{
                borderRadius: "8px",
                bgcolor: "background.paper",
              }}
              onChanged={handleTogglePB}
            />
            <ButtonShare
              sx={{
                borderRadius: "8px",
                bgcolor: "background.paper",
              }}
              beatPattern={config.beatPattern}
            />
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
            }}
          >
            Тренажер гитарного боя
          </Typography>
          {/* Правый блок с кнопками About и ThemeToggle */}
          <Box sx={{ display: "flex", gap: "10px" }}>
            <About color="inherit" />
            <ButtonThemeToggle color="inherit">Login</ButtonThemeToggle>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});
export default Header;
