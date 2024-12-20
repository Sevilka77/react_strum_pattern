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
          default: "#121212", // Темный фон
          paper: "#1d1d1d", // Фон для компонентов
        },
        text: {
          primary: "#FFFFFF",
        },
      },
      typography: {
        fontFamily: "Inter, sans-serif", // Основной шрифт
        h1: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          color: "#917AEA",
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
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          color: "#FFFFFF",
        },
        body1: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          color: "#FFFFFF",
        },
        button: {
          fontFamily: "'Montserrat', sans-serif",
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
              background: "#0C0F2A",
            },
          },
        },
        MuiSnackbar: {
          styleOverrides: {
            root: {
              background: "#0C0F2A",
              borderRadius: "1rem",
              border: "4px solid #39F1FF", // Единственная рамка 4px
              boxShadow: "0 0 0.3rem #39F1FF,inset 0 0 0.3rem #39F1FF;",
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
