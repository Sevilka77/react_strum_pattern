import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "./ConfigProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
);
