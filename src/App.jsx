import { Routes, Route } from "react-router-dom"; // Убедитесь, что импортируете только Routes
import PatternPage from "./pages/PatternPage";
import ThemeContextProvider from "./components/ThemeContextProvider";
import HomePage from "./pages/HomePage";

function App() {
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
