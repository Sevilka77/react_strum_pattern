// components/ThemeContextProvider.js
import { useMemo } from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme, CssBaseline, GlobalStyles } from "@mui/material";
import { responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/inter/300.css"; // Импортируем шрифты
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

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
          fontWeight: 600,
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
      {/* Глобальные стили для шрифтов */}
      <GlobalStyles
        styles={{
          "@font-face": [
            {
              fontFamily: "Montserrat",
              src: `url('/assets/montserrat.woff2') format('woff2')`,
              fontDisplay: "swap", // Используем swap, чтобы текст сразу был виден
            },
            {
              fontFamily: "Inter",
              src: `url('/assets/inter.woff2') format('woff2')`,
              fontDisplay: "swap",
            },
          ],
        }}
      />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeContextProvider;
