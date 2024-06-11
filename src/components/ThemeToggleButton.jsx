// components/ThemeToggleButton.js
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { MoonIcon, SunIcon } from "lucide-react";
import { ColorModeContext } from "./ThemeContextProvider";

const ThemeToggleButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      color="inherit"
      sx={{
        fontSize: "40px",
        borderRadius: "50%",
        border: "1px solid #f5f5f5",
      }}
    >
      {theme.palette.mode === "dark" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
