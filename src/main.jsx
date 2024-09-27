import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "./ConfigProvider.jsx";
const YandexMetrika =
  import.meta.env.MODE === "production"
    ? React.lazy(() => import("./components/YandexMetrika"))
    : null;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ConfigProvider>
        <App />
        {YandexMetrika && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <YandexMetrika />
          </React.Suspense>
        )}
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
);
