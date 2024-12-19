import { lazy, Suspense } from "react";

import Header from "../components/Header";
import { Container } from "@mui/material";

const PatternList = lazy(() => import("../components/PatternList"));

function ListPage({ level }) {
  return (
    <>
      <Header />
      <Container
        component="main"
        sx={{
          display: "flex",
          minHeight: "80dvh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        maxWidth="xl"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <PatternList level={level} />
        </Suspense>
      </Container>
    </>
  );
}

export default ListPage;
