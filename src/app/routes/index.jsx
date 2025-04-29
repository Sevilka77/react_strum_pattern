import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import TopBarLoader from "@/shared/ui/TopBarLoader";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LearnPage = lazy(() => import("../../pages/LearnPage"));
const EditorPage = lazy(() => import("../../pages/EditorPage"));
const ListPage = lazy(() => import("../../pages/ListPage/ListPage"));
const PatternPage = lazy(() => import("../../pages/PatternPage"));
const RhythmPage = lazy(() => import("../../pages/RhythmPage"));

const AppRoutes = () => (
  <Suspense fallback={<TopBarLoader />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/create" element={<EditorPage />} />
      <Route path="/rhythm" element={<RhythmPage />} />
      <Route path="/patterns" element={<ListPage level={"main"} />} />
      <Route path="/custom" element={<ListPage level={"custom"} />} />
      <Route path="/pattern/:beatPattern" element={<PatternPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
