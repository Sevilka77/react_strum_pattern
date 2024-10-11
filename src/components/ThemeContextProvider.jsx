// components/ThemeContextProvider.js
import { useState, useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
          main: mode === "dark" ? "#0f0" : "#2aa298",
        },
        background: {
          default: mode === "dark" ? "#111111" : "#fdf6e3",
          paper: mode === "dark" ? "#212121" : "#ede7d4",
        },
        text: {
          primary: mode === "dark" ? "#bbc4c4" : "#657b83",
        },
      },
      typography: {
        fontFamily: "Open Sans",
        h1: { fontFamily: "Ubuntu Mono" },
        h2: { fontFamily: "Ubuntu Mono" },
        h3: { fontFamily: "Ubuntu Mono" },
        h4: { fontFamily: "Ubuntu Mono" },
        h5: { fontFamily: "Ubuntu Mono" },
        h6: { fontFamily: "Ubuntu Mono" },
        subtitle1: { fontFamily: "Ubuntu Mono" },
        subtitle2: { fontFamily: "Ubuntu Mono" },
        button: {
          fontFamily: "Ubuntu Mono",
          fontWeight: 900,
        },
        overline: { fontFamily: "Ubuntu Mono" },
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
