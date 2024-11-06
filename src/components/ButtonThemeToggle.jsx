// components/ThemeToggleButton.js
import { useContext } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { ColorModeContext } from "./ThemeContextProvider";
import { memo } from "react";
import { IconButton, useTheme } from '@mui/material';
const ButtonThemeToggleNM = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      size="large"
      aria-label="Смена цвета темы"
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
const ButtonThemeToggle = memo(ButtonThemeToggleNM);
export default ButtonThemeToggle;
