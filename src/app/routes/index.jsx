import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LearnPage = lazy(() => import("../../pages/LearnPage"));
const EditorPage = lazy(() => import("../../pages/EditorPage"));
const ListPage = lazy(() => import("../../pages/ListPage/ListPage"));
const PatternPage = lazy(() => import("../../pages/PatternPage"));

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/create" element={<EditorPage />} />
      <Route path="/patterns" element={<ListPage level={"main"} />} />
      <Route path="/custom" element={<ListPage level={"custom"} />} />
      <Route path="/pattern/:beatPattern" element={<PatternPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
