import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import TopBarLoader from "@/shared/ui/TopBarLoader";

// Ленивая загрузка страниц
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LearnPage = lazy(() => import("../../pages/LearnPage"));
const EditorPage = lazy(() => import("../../pages/EditorPage"));
const ListPage = lazy(() => import("../../pages/ListPage/ListPage"));
const PatternPage = lazy(() => import("../../pages/PatternPage"));
const RhythmPage = lazy(() => import("../../pages/RhythmPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

// Список допустимых символов для beatPattern

// This is a functional component called NotFoundPage

const validPatternChars = ["A", "1", "0", "x", "c", "h", "b"];
function AppRoutes() {
  const navigate = useNavigate();

  // Проверка корректности beatPattern
  const BeatPatternValidator = ({ children }) => {
    const { beatPattern } = useParams();

    useEffect(() => {
      // Проверка на допустимость символов
      const isValidPattern =
        beatPattern &&
        [...beatPattern].every((char) => validPatternChars.includes(char));

      if (!isValidPattern) {
        // Если паттерн некорректен, редиректим на страницу 404
        navigate("/404", { replace: true });
      }
    }, [beatPattern, navigate]);

    // Если паттерн некорректен, не рендерим дочерние компоненты
    return children;
  };

  return (
    <Suspense fallback={<TopBarLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/create" element={<EditorPage />} />
        <Route path="/rhythm" element={<RhythmPage />} />
        <Route path="/patterns" element={<ListPage level="main" />} />
        <Route path="/custom" element={<ListPage level="custom" />} />

        <Route
          path="/pattern/:beatPattern"
          element={
            <BeatPatternValidator>
              <PatternPage />
            </BeatPatternValidator>
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
