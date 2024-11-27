import { Routes, Route } from "react-router-dom"; // Убедитесь, что импортируете только Routes
import PatternPage from "./pages/PatternPage";
import ThemeContextProvider from "./components/ThemeContextProvider";
import HomePage from "./pages/HomePage";
import useWakeLock from "./hooks/useWakeLock";
import { Box } from "@mui/material";
import LearnPage from "./pages/LearnPage";

function App() {
  useWakeLock();
  return (
    <ThemeContextProvider>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, #0C0F2A 0%, #2D0966 100%)", // пример градиента
          // отступы по бокам
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/pattern/:beatPattern" element={<PatternPage />} />
        </Routes>
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
