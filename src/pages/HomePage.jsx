import { lazy, Suspense } from "react";
import { Card, Grid, Toolbar, Typography } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Schema from "../components/schema";
import { Link } from "react-router-dom";

// Динамический импорт PatternList
const PatternList = lazy(() => import("../components/PatternList"));

function HomePage() {
  return (
    <>
      <Header />
      <Toolbar />
      <Schema />
      <Grid container component="main" spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Card
            sx={{
              mb: 2,
              width: "100%",
              p: 0.5,
              textAlign: "center",
              height: "2rem",
            }}
          >
            <Typography
              component={Link} // Заменили компонент на Link
              to="/pattern/0000"
              state={{ editMode: true }}
              variant="h6"
              color="#e0f7fa"
              sx={{
                cursor: "pointer",
                lineHeight: "2rem",
                textDecoration: "none", // убираем подчеркивание
              }}
            >
              Создать свой бой
            </Typography>
          </Card>
        </Grid>

        {/* Блок для легкого уровня */}
        <Grid item component="section" xs={11} md={2}>
          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#7be98d",
              mb: 2,
              p: 2,
            }}
          >
            <Typography variant="h5" color="#e0f7fa" sx={{ mb: 1 }}>
              Начать можно с
            </Typography>
            {/* Используем Suspense для оборачивания динамически загружаемого компонента */}
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="learn" />
            </Suspense>
          </Card>
        </Grid>

        {/* Блок для легкого уровня */}
        <Grid item component="section" xs={11} md={2}>
          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#7bd8e9",
              mb: 2,
              p: 2,
            }}
          >
            <Typography variant="h5" color="#e0f7fa" sx={{ mb: 1 }}>
              Легкие бои
            </Typography>
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="easy" />
            </Suspense>
          </Card>
        </Grid>

        {/* Блок для среднего уровня */}
        <Grid item component="section" xs={11} md={2}>
          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#ffcc80",
              mb: 2,
              p: 2,
            }}
          >
            <Typography variant="h5" color="#fff3e0" sx={{ mb: 1 }}>
              Средней сложности сбои
            </Typography>
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="medium" />
            </Suspense>
          </Card>
        </Grid>

        {/* Блок для сложного уровня */}
        <Grid item component="section" xs={11} md={2}>
          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#ff8a80",
              mb: 2,
              p: 2,
            }}
          >
            <Typography variant="h5" color="#ffebee" sx={{ mb: 1 }}>
              Сложные бои
            </Typography>
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="hard" />
            </Suspense>
          </Card>
        </Grid>

        {/* Блок для разных боев */}
        <Grid item component="section" xs={11} md={2}>
          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#ff80f4",
              mb: 2,
              p: 2,
            }}
          >
            <Typography variant="h5" color="#ffebee" sx={{ mb: 1 }}>
              Разные бои
            </Typography>
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
