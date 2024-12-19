import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// import Footer from "../components/Footer";
import Header from "../components/Header";

import Schema from "../components/schema";
import { Link } from "react-router-dom";

const CardButton = styled(Button)({
  width: "100%",
  textTransform: "uppercase",
  borderRadius: "8px",
  color: "#bdb8c9",
  border: "2px solid #4A434B", // Цвет текста кнопки
  "&:hover": {
    color: "#FFF", // Цвет текста при наведении
  },
});

function HomePage() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <Box
          component="section"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: "clamp(24px,5.75vw, 360px)",
              lineHeight: "1",
              textAlign: "center",
              fontWeight: 700,
              mb: {
                xs: 1, // Мобильные устройства
                sm: 2, // Средние устройства
                md: 3, // Большие устройства
              },
            }}
          >
            Освой гитарные бои{" "}
            <span style={{ color: "#FFD700" }}>с легкостью!</span>
          </Typography>

          <Typography
            sx={{
              lineHeight: "1",
              textAlign: "center",
              color: "#9D9CA4",
              fontSize: "clamp(16px, 2.08vw, 40px)",
              mb: {
                xs: 1, // Мобильные устройства
                sm: 2, // Средние устройства
                md: 3, // Большие устройства
              },
            }}
          >
            Развивайте чувство ритма и совершенствуйте навыки игры с помощью
            упражнений, гитарных боев и тренировок под метроном. Сделай свой
            прогресс на гитаре быстрее!
          </Typography>

          <Schema />
        </Box>
        <Box component="section">
          <Box
            component="ul"
            sx={{
              display: "grid", // Устанавливаем Grid

              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }, // Сетка
              p: 0,
              gap: {
                xs: 1, // Мобильные устройства
                md: 2, // Средние устройства
                lg: 4,
              },
              listStyle: "none", // Убираем маркеры списка
            }}
          >
            <Card
              component="li"
              sx={{
                minWidth: 275,
                borderRadius: "16px",
                border: "2px solid #4A434B", //
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography color="#FFA500" variant="h5" component="h2">
                  Создай свой бой
                </Typography>

                <Typography color="#9D9CA4" variant="body2">
                  Создавай уникальные ритмы с помощью удобного конструктора.
                  Настрой упражнения под себя и тренируйся эффективно.
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <CardButton
                  component={Link} // Используем Link для маршрутизации
                  to="/create"
                >
                  Создать бой
                </CardButton>
              </CardActions>
            </Card>

            <Card
              component="li"
              sx={{
                minWidth: 275,
                borderRadius: "16px",
                border: "2px solid #4A434B", //
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography color="#00BFFF" variant="h5" component="h2">
                  Тренировка боя
                </Typography>

                <Typography color="#9D9CA4" variant="body2">
                  Тренируйся с 22 ритмическими заданиями. Улучши чувство ритма и
                  отточи технику шаг за шагом.
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <CardButton
                  component={Link} // Используем Link для маршрутизации
                  to="/learn"
                >
                  Начать тренировку
                </CardButton>
              </CardActions>
            </Card>

            <Card
              component="li"
              sx={{
                minWidth: 275,
                borderRadius: "16px",
                border: "2px solid #4A434B", //
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography color="#00FA9A" variant="h5" component="h2">
                  Основные бои
                </Typography>

                <Typography color="#9D9CA4" variant="body2">
                  Изучи классические гитарные бои, такие как «Шестёрка» и
                  «Восьмёрка». Тренируйся с метрономом для укрепления техники
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <CardButton
                  component={Link} // Используем Link для маршрутизации
                  to="/patterns"
                >
                  Изучить бои
                </CardButton>
              </CardActions>
            </Card>
            <Card
              component="li"
              sx={{
                minWidth: 275,
                borderRadius: "16px",
                border: "2px solid #4A434B", //
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography color="#FF69B4" variant="h5" component="h2">
                  Пользовательские бои
                </Typography>

                <Typography color="#9D9CA4" variant="body2">
                  Открывай популярные ритмы, созданные другими пользователями, и
                  вдохновляйся уникальными идеями.
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <CardButton
                  component={Link} // Используем Link для маршрутизации
                  to="/custom"
                >
                  Смотреть бои
                </CardButton>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
