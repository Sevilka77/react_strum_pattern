//import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Providers from "./providers/index.jsx";

import useWakeLock from "../hooks/useWakeLock.jsx";
import { Box } from "@mui/material";

import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/index.jsx";

const YandexMetrika =
  import.meta.env.MODE === "production"
    ? lazy(() => import("../components/YandexMetrika.jsx"))
    : null;

const App = () => {
  useWakeLock();
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
