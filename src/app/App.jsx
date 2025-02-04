//import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Providers from "./providers/index.jsx";

import useWakeLock from "@/shared/hooks/useWakeLock";
import { Box } from "@mui/material";

import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/index.jsx";
import { loadAllChordsSamples } from "@/features/tone/lib/samplesUtil";

const YandexMetrika =
  import.meta.env.MODE === "production"
    ? lazy(() => import("../components/YandexMetrika.jsx"))
    : null;

const App = () => {
  useWakeLock();

  useEffect(() => {
    loadAllChordsSamples(); // Загружаем сэмплы один раз
  }, []);
  return (
    <Providers>
      {YandexMetrika && (
        <Suspense>
          <YandexMetrika />
        </Suspense>
      )}
      <BrowserRouter>
        <Box
          sx={{
            minHeight: "100dvh",
          }}
        >
          <AppRoutes />
        </Box>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
