import { lazy, Suspense } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
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
        {/* Блок для легкого уровня
        <Grid component="section" size={{ xs: 12, md: 2 }}>
          <Typography
            component="h2"
            variant="h5"
            color="#39F1FF"
            sx={{
              textShadow: `0 0 42px `,
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
              boxShadow: "0 0 0.3rem #39F1FF,inset 0 0 0.3rem #39F1FF;",
            }}
          >
            {/* Используем Suspense для оборачивания динамически загружаемого компонента */}
        {/* <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="learn" />
            </Suspense>
          </Card>
        </Grid> */}{" "}
        {/* Блок для легкого уровня */}
        <Grid component="section" size={{ xs: 12, md: 2 }}>
          <Card
            sx={{
              borderRadius: "1rem",
              border: "4px solid #4495F4", // Единственная рамка 4px
              boxShadow: "0 0 0.3rem #4495F4,inset 0 0 0.3rem #4495F4;",
              p: 2,
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                sssssssss
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid component="section" size={{ xs: 12, md: 2 }}>
          <Typography
            component="h2"
            variant="h5"
            color="#4495F4"
            sx={{
              textShadow: `0 0 42px `,
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
              boxShadow: "0 0 0.3rem #4495F4,inset 0 0 0.3rem #4495F4;",
              p: 2,
            }}
          >
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="easy" />
            </Suspense>
          </Card>
        </Grid>
        {/* Блок для среднего уровня */}
        <Grid component="section" size={{ xs: 12, md: 2 }}>
          <Typography
            component="h2"
            variant="h5"
            color="#A660FF"
            sx={{
              textShadow: `0 0 42px `,
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
              boxShadow: "0 0 0.3rem #A660FF,inset 0 0 0.3rem #A660FF;",

              p: 2,
            }}
          >
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="medium" />
            </Suspense>
          </Card>
        </Grid>
        {/* Блок для сложного уровня */}
        <Grid component="section" size={{ xs: 12, md: 2 }}>
          <Typography
            component="h2"
            variant="h5"
            color="#FF6084"
            sx={{
              textShadow: `0 0 42px `,
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
              boxShadow: "0 0 0.3rem #FF6084,inset 0 0 0.3rem #FF6084;",
              p: 2,
            }}
          >
            <Suspense fallback={<div>Загрузка...</div>}>
              <PatternList level="hard" />
            </Suspense>
          </Card>
        </Grid>
        {/* Блок для разных боев */}
        <Grid component="section" size={{ xs: 12, md: 2 }}>
          <Typography
            component="h2"
            variant="h5"
            color="#FFC755"
            sx={{
              textShadow: `0 0 42px `,
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
              boxShadow: "0 0 0.3rem #FFC755,inset 0 0 0.3rem #FFC755;",

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
