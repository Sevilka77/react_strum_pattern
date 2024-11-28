import { lazy, Suspense } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { Container } from "@mui/material";

const PatternList = lazy(() => import("../components/PatternList"));

function ListPage({ level }) {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl" sx={{ minHeight: "100vh" }}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <PatternList level={level} />
        </Suspense>
      </Container>
      <Footer />
    </>
  );
}

export default ListPage;
