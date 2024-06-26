// components/ThemeToggleButton.js
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { MoonIcon, SunIcon } from "lucide-react";
import { ColorModeContext } from "./ThemeContextProvider";
import { memo } from "react";
const ButtonThemeToggleNM = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      size="large"
      aria-label="account switch theme"
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
const ButtonThemeToggle = memo(ButtonThemeToggleNM);
export default ButtonThemeToggle;
