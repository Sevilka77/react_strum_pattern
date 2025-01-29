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
        mode: "dark", // Задаем фиксированный режим
        background: {
          default: "#121C1D", // Темный фон
          paper: "#121C1D", // Фон для компонентов
        },
        text: {
          primary: "#9D9CA4",
        },
      },
      typography: {
        fontFamily: "Inter, sans-serif", // Основной шрифт
        h1: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          color: "#121C1D",
        },
        h2: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          color: "#FFFFFF",
        },
        h3: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          color: "#FFFFFF",
        },
        h4: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          color: "#FFFFFF",
        },
        h5: {
          fontFamily: "Roboto",
          fontWeight: 500,
          color: "#FFFFFF",
          fontSize: "18px",
        },
        h6: {
          fontFamily: "Roboto",
          fontWeight: 300,
          color: "#FFFFFF",
        },
        body1: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          color: "#FFFFFF",
        },
        button: {
          fontFamily: "Roboto",
          textTransform: "none", // Отключаем преобразование в верхний регистр
        },
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              background: "transparent",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              background: "#30393a",
            },
          },
        },
        MuiSnackbarContent: {
          styleOverrides: {
            root: {
              background: "#121C1D",
              color: "#ffffff",
              borderRadius: "8px",
              border: "2px solid #4A434B",
            },
          },
        },
        MuiBottomNavigation: {
          styleOverrides: {
            root: {
              background: "transparent",
            },
          },
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
