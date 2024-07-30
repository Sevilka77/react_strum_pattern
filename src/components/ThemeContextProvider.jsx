// components/ThemeContextProvider.js
import { useState, useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // Настройки для светлой темы
                background: {
                  default: "#fdf6e3",
                  paper: "#ffffff",
                },
                warning: {
                  main: "#cb4b16",
                },
                primary: {
                  main: "#2aa298", // Цвет AppBar и других элементов, использующих primary
                },
                text: {
                  primary: "#657b83",
                },
              }
            : {
                // Настройки для темной темы
                background: {
                  default: "#002b36",
                  paper: "#005666",
                },
                warning: {
                  main: "#fb74b5;",
                },
                primary: {
                  main: "#7cd9e9", // Цвет AppBar и других элементов, использующих primary
                },
                text: {
                  primary: "#006a85",
                },
              }),
        },
      }),
    [mode],
  );
  // light-theme {
  //     --text: #657b83;
  //     --cyan2: #ede7d4;
  //     --bg: #fdf6e3;
  //     --bg-vals: 44, 87%, 94%;
  //     --bg-dark: #b2aa98;

  //     --bg-dark-alt: #f0eadb;
  //     --bg-light: #fef9ec;

  //     --accent: #2aa298;

  //     --accent2: #cb4b16;
  //     --accent3: #d33682;
  // :root {
  //   --cyan: #005766;
  //   --cyan2: #447983;
  //   --cyan-dark: #00252e;
  //   --bg: #002b36;
  //   --bg-vals: 192.2, 100%, 10.6%;
  //   --bg-dark: #00141a;
  //   --bg-dark-vals: 192, 100%, 5%;
  //   --bg-dark2: #00252e;
  //   --bg-light: #004152;
  //   --bg-light2: #006a85;
  //   --bg-light3: #7cd9e9;
  //   --text: #bbc4c4;
  //   --font-family: Figtree, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  //   --accent: #e4bed3;
  //   --accent-vals: 327, 42%, 82%;
  //   --accent2: #fb74b5;
  //   --accent3: #7cd9e9;
  // }
  console.log(theme.palette);
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
