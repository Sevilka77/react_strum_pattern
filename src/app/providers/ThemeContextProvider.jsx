// components/ThemeContextProvider.js
import { useMemo } from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme, CssBaseline, GlobalStyles } from "@mui/material";
import { responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/comfortaa"; // Импорт шрифта Comfortaa

const ThemeContextProvider = ({ children }) => {
  // Создаем тему с фиксированными значениями, без переключения
  const theme = useMemo(() => {
    const baseTheme = createTheme({
      typography: {
        fontFamily: "Comfortaa, sans-serif",
      },
      palette: {
        mode: "dark",
        primary: {
          main: "#90caf9",
        },
        secondary: {
          main: "#ce93d8",
        },
        background: {
          default: "#121212",
          paper: "#121212",
        },
        // primary: {
        //   main: "#7b61ff",
        //   inverse: "#FFFFFF",
        //   contrastText: "#FFFFFF",
        // },
        // secondary: {
        //   main: "#A28E66",
        //   contrastText: "#1E1B13",
        // },
        tertiary: {
          main: "#7FA08C",
          contrastText: "#1E1B13",
        },
        error: {
          main: "#FFB4AB",
          contrastText: "#1E1B13",
        },
        background: {
          default: "#17171a",
          paper: "#1d1e21",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#FFFFFF",
        },
        custom: {
          button: "#e0e0e0",
          c1: "#f9e287",
          c2: "#bee9ff",
          c3: "#eedcff",
          c4: "#c0efb0",
          c5: "#ffd9dd",
        },
      },
    });

    // Применяем адаптивные размеры для шрифтов
    return responsiveFontSizes(baseTheme);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeContextProvider;
