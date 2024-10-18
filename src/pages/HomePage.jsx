import { Card, Grid, Toolbar } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PatternList from "../components/PatternList";

function HomePage() {
  return (
    <>
      <Header />
      <Toolbar></Toolbar>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10} md={4}>
          {/* <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#7bd8e9",
            }}
          >
            <CardContent>
              <Typography component="h2" variant="h5">
                {"Привет, друг!"}
              </Typography>

              <Typography variant="subtitle1" paragraph>
                {
                  "Рады видеть тебя на нашем сайте, посвященном тренировке гитарного чеса! Здесь ты сможешь развить свои навыки и стать настоящим              гитаристом."
                }
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#7bd8e9",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" paragraph>
                Если ты только начинаешь свой путь, рекомендуем перейти по
                ссылке, где мы вместе освоим основные маятниковые движения.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href="/beginner">
                Учимся маятниковым движениям
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#7bd8e9",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" paragraph>
                Если ты уже знаком с основами и хочешь поработать над своим
                чувством ритма, переходи по ссылке с рандомными боями — каждый
                раз тебя будет ждать что-то новое!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href="/random-strums">
                Тренировать ритм с рандомными боями
              </Button>
            </CardActions>
          </Card>

          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#7bd8e9",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" paragraph>
                А если тебе нужно поотрабатывать стандартные бои, просто смотри
                список ниже и выбирай, что тебе интересно.
              </Typography>
            </CardContent>
          </Card> */}
          <Card
            sx={{
              borderRadius: "1rem",
              borderWidth: "2px",
              border: "solid",
              borderColor: "#7bd8e9",
            }}
          >
            <PatternList />
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default HomePage;
