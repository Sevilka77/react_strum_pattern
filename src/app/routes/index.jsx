import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import TopBarLoader from "@/shared/ui/TopBarLoader";
// import Providers from "./providers/index.jsx";
const Providers = lazy(() => import("../providers"));
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
        {/* Без провайдеров — титульная и 404 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/patterns" element={<ListPage level="main" />} />
        <Route path="/custom" element={<ListPage level="custom" />} />

        {/* С провайдерами — остальные */}
        <Route
          path="/learn"
          element={
            <Providers>
              <LearnPage />
            </Providers>
          }
        />
        <Route
          path="/create"
          element={
            <Providers>
              <EditorPage />
            </Providers>
          }
        />
        <Route
          path="/rhythm"
          element={
            <Providers>
              <RhythmPage />
            </Providers>
          }
        />
        <Route
          path="/pattern/:beatPattern"
          element={
            <Providers>
              <BeatPatternValidator>
                <PatternPage />
              </BeatPatternValidator>
            </Providers>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
