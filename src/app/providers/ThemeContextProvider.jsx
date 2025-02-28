// components/ThemeContextProvider.js
import { useMemo } from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme, CssBaseline, GlobalStyles } from "@mui/material";
import { responsiveFontSizes } from "@mui/material/styles";

const ThemeContextProvider = ({ children }) => {
  // Создаем тему с фиксированными значениями, без переключения
  const theme = useMemo(() => {
    const baseTheme = createTheme({
      palette: {
        mode: "dark",
        primary: {
          main: "#BFAF6F",
          inverse: "#dbc66e",
          contrastText: "#1E1B13",
        },
        secondary: {
          main: "#A28E66",
          contrastText: "#1E1B13",
        },
        tertiary: {
          main: "#7FA08C",
          contrastText: "#1E1B13",
        },
        error: {
          main: "#FFB4AB",
          contrastText: "#1E1B13",
        },
        background: {
          default: "#1E1B13",
          paper: "#2C2A24",
        },
        text: {
          primary: "#EAE0C8",
          secondary: "#BFB39A",
        },
        custom: {
          c1: "#f9e287",
          c2: "#bee9ff",
          c3: "#eedcff",
          c4: "#c0efb0",
          c5: "#ffd9dd",
        },
      },
      // palette: {
      //   mode: "dark", // Задаем фиксированный режим
      //   background: {
      //     default: "#121C1D", // Темный фон
      //     paper: "#121C1D", // Фон для компонентов
      //   },
      //   text: {
      //     primary: "#9D9CA4",
      //   },
      // },

      // components: {
      //   MuiCard: {
      //     styleOverrides: {
      //       root: {
      //         background: "transparent",
      //       },
      //     },
      //   },
      //   MuiPaper: {
      //     styleOverrides: {
      //       root: {
      //         background: "#30393a",
      //       },
      //     },
      //   },
      //   MuiSnackbarContent: {
      //     styleOverrides: {
      //       root: {
      //         background: "#121C1D",
      //         color: "#ffffff",
      //         borderRadius: "8px",
      //         border: "2px solid #4A434B",
      //       },
      //     },
      //   },
      //   MuiBottomNavigation: {
      //     styleOverrides: {
      //       root: {
      //         background: "transparent",
      //       },
      //     },
      //   },
      // },
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
