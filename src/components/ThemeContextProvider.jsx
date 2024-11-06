// components/ThemeContextProvider.js
import { useState, useMemo, createContext } from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme, CssBaseline } from '@mui/material';
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark"); // По умолчанию тема тёмная

  // Функция для переключения темы
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    [],
  );

  // Опции темы, зависящие от текущего состояния (светлая/тёмная тема)
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
        primary: {
          main: mode === "dark" ? "#2AA298" : "#2aa298",
        },
        background: {
          default: mode === "dark" ? "#002B36" : "#fdf6e3",
          paper: mode === "dark" ? "#00242d" : "#ede7d4",
        },
        text: {
          primary: mode === "dark" ? "#bbc4c4" : "#657b83",
        },
      },

      components: {
        MuiAppBar: {
          styleOverrides: { root: { background: "#FB74B5" } },
        },
      },
    });
  }, [mode]); // Зависит от текущей темы

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
