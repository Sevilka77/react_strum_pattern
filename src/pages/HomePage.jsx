import { lazy, Suspense } from "react";
import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Schema from "../components/schema";

// Динамический импорт PatternList
const PatternList = lazy(() => import("../components/PatternList"));

function HomePage() {
  return (
    <>
      <Header />

      <Schema />
      <Grid
        container
        component="main"
        paddingTop={10}
        paddingX={3}
        spacing={1}
        alignItems="start" // Вертикальное выравнивание по центру
        justifyContent="center"
      >
        {/* Блок для легкого уровня */}
        <Grid component="section" size={{ xs: 9, md: 2 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              pb: 2,
            }}
          >
            Для начала
          </Typography>
          <Card
            sx={{
              borderRadius: "1rem",
              border: "4px solid #39F1FF", // Единственная рамка 4px
              filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04))",
            }}
          >
            {/* Используем Suspense для оборачивания динамически загружаемого компонента */}
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="learn" />
            </Suspense>
          </Card>
        </Grid>

        {/* Блок для легкого уровня */}
        <Grid component="section" size={{ xs: 9, md: 2 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              pb: 2,
            }}
          >
            Легкие
          </Typography>
          <Card
            sx={{
              borderRadius: "1rem",
              border: "4px solid #4495F4", // Единственная рамка 4px
              filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04))",
              mb: 2,
              p: 2,
            }}
          >
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="easy" />
            </Suspense>
          </Card>
        </Grid>

        {/* Блок для среднего уровня */}
        <Grid component="section" size={{ xs: 9, md: 2 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              pb: 2,
            }}
          >
            Средние
          </Typography>
          <Card
            sx={{
              borderRadius: "1rem",
              border: "4px solid #A660FF", // Единственная рамка 4px
              filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04))",
              mb: 2,
              p: 2,
            }}
          >
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="medium" />
            </Suspense>
          </Card>
        </Grid>

        {/* Блок для сложного уровня */}
        <Grid component="section" size={{ xs: 9, md: 2 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              pb: 2,
            }}
          >
            Сложные
          </Typography>
          <Card
            sx={{
              borderRadius: "1rem",
              border: "4px solid #FF6084", // Единственная рамка 4px
              filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04))",
              mb: 2,
              p: 2,
            }}
          >
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="hard" />
            </Suspense>
          </Card>
        </Grid>

        {/* Блок для разных боев */}
        <Grid component="section" size={{ xs: 9, md: 2 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              pb: 2,
            }}
          >
            Разные бои
          </Typography>
          <Card
            sx={{
              borderRadius: "1rem",
              border: "4px solid #FFC755", // Единственная рамка 4px
              filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.04))",
              mb: 2,
              p: 2,
            }}
          >
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="other" />
            </Suspense>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default HomePage;
