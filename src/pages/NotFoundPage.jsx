import Header from "../features/header";
import { Suspense } from "react";
import TopBarLoader from "@/shared/ui/TopBarLoader";

import { Container } from "@mui/material";

function NotFoundPage() {
  return (
    <>
      <Header />

      <Container
        component="main"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
        }}
        maxWidth="xl"
      >
        <Suspense fallback={<TopBarLoader />}>
          <div>
            <h1>404</h1>
            <h2>Страница не найдена</h2>
          </div>
        </Suspense>
      </Container>
    </>
  );
}

export default NotFoundPage;
