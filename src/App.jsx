import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PatternPage from "./pages/PatternPage";
import ThemeContextProvider from "./provider/ThemeContextProvider";
import HomePage from "./pages/HomePage";
import useWakeLock from "./hooks/useWakeLock";
import { Box } from "@mui/material";
import LearnPage from "./pages/LearnPage";
import EditorPage from "./pages/EditorPage";
import ListPage from "./pages/ListPage";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "./provider/ConfigProvider";
import { CycleProvider } from "./provider/CycleProvider";
// Ленивое импортирование YandexMetrika только в production
// eslint-disable-next-line react-refresh/only-export-components
const YandexMetrika =
  import.meta.env.MODE === "production"
    ? lazy(() => import("./components/YandexMetrika.jsx"))
    : null;

const App = () => {
  useWakeLock();
  return (
    <ThemeContextProvider>
      {YandexMetrika && (
        <Suspense>
          <YandexMetrika />
        </Suspense>
      )}
      <BrowserRouter>
        <ConfigProvider>
          <CycleProvider>
            <Box
              sx={{
                minHeight: "100dvh",
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/create" element={<EditorPage />} />
                <Route path="/patterns" element={<ListPage level={"main"} />} />
                <Route path="/custom" element={<ListPage level={"custom"} />} />
                <Route path="/pattern/:beatPattern" element={<PatternPage />} />
              </Routes>
            </Box>{" "}
          </CycleProvider>
        </ConfigProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
