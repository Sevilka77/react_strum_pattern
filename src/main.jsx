import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "./ConfigProvider.jsx";
import { CycleProvider } from "./CycleProvider.jsx";

// Ленивое импортирование YandexMetrika только в production
// eslint-disable-next-line react-refresh/only-export-components
const YandexMetrika =
  import.meta.env.MODE === "production"
    ? React.lazy(() => import("./components/YandexMetrika.jsx"))
    : null;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {YandexMetrika && (
      <React.Suspense fallback={<div>Loading...</div>}>
        <YandexMetrika />
      </React.Suspense>
    )}
    <BrowserRouter>
      <ConfigProvider>
        <CycleProvider>
          <App />
        </CycleProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
