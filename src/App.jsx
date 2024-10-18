import { Routes, Route } from "react-router-dom"; // Убедитесь, что импортируете только Routes
import PatternPage from "./pages/PatternPage";
import ThemeContextProvider from "./components/ThemeContextProvider";
import HomePage from "./pages/HomePage";
import useWakeLock from "./hooks/useWakeLock";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

function App() {
  useWakeLock();
  return (
    <ThemeContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pattern/:beatPattern" element={<PatternPage />} />
      </Routes>
    </ThemeContextProvider>
  );
}

export default App;
