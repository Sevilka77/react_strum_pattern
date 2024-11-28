import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import Footer from "../components/Footer";
import Header from "../components/Header";

import Schema from "../components/schema";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl" sx={{ minHeight: "100vh" }}>
        <Box
          sx={{
            my: {
              xs: 1, // Мобильные устройства
              sm: 2, // Средние устройства
              md: 14, // Большие устройства
            },
            color: "#FFFFFF", // Светлый текст
            textAlign: "center", // Выравнивание по центру
          }}
        >
          {/* Заголовок секции */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#39F1FF", // Акцентный цвет
            }}
          >
            Strumming.ru
          </Typography>

          {/* Основной заголовок */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              margin: "1rem 0",
              fontSize: { xs: "2rem", sm: "3rem" }, // Адаптивный размер
            }}
          >
            Освой гитарные бои{" "}
            <span style={{ color: "#FFD700" }}>с легкостью!</span>
          </Typography>

          {/* Подзаголовок */}
          <Typography
            variant="body1"
            sx={{
              maxWidth: "600px", // Ограничиваем ширину текста
              margin: "0 auto 2rem auto", // Центрируем
              fontSize: "1.1rem",
              lineHeight: "1.6",
            }}
          >
            Тренируй свои навыки ритма и чувства такта с помощью уникальных
            упражнений, метрономов и гитарных боев. Сделай свой прогресс на
            гитаре быстрее!
          </Typography>

          <Schema />
        </Box>
        <Box
          component="ul"
          sx={{
            display: "grid", // Устанавливаем Grid
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Сетка
            gap: 2, // Расстояние между элементами
            maxWidth: "100%",
            padding: "1rem 1rem",
            listStyle: "none", // Убираем маркеры списка
          }}
        >
          <Card
            component="li"
            sx={{
              minWidth: 275,
              borderRadius: "1rem",
              border: "4px solid #4495F4", // Единственная рамка 4px
              boxShadow: "0 0 0.3rem #4495F4,inset 0 0 0.3rem #4495F4;",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "&:hover": {
                boxShadow: "0 0 1rem #39F1FF, inset 0 0 0.5rem #39F1FF",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Создай свой бой
              </Typography>

              <Typography variant="body2">
                <br />
                Используй наш интуитивный конфигуратор, чтобы создать уникальные
                ритмические паттерны. Настрой свои упражнения и тренируйся с
                максимальной эффективностью.
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                component={Link} // Используем Link для маршрутизации
                to="/create"
                size="small"
              >
                Создать
              </Button>
            </CardActions>
          </Card>

          <Card
            component="li"
            sx={{
              minWidth: 275,
              borderRadius: "1rem",
              border: "4px solid #4495F4", // Единственная рамка 4px
              boxShadow: "0 0 0.3rem #4495F4,inset 0 0 0.3rem #4495F4;",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "&:hover": {
                boxShadow: "0 0 1rem #39F1FF, inset 0 0 0.5rem #39F1FF",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Тренировка
              </Typography>

              <Typography variant="body2">
                <br />
                Погрузись в непрерывную тренировку с 22 уникальными ритмическими
                заданиями. Развивай чувство ритма и оттачивай мастерство с
                каждым шагом.
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                component={Link} // Используем Link для маршрутизации
                to="/learn"
                size="small"
              >
                Играть
              </Button>
            </CardActions>
          </Card>

          <Card
            component="li"
            sx={{
              minWidth: 275,
              borderRadius: "1rem",
              border: "4px solid #4495F4", // Единственная рамка 4px
              boxShadow: "0 0 0.3rem #4495F4,inset 0 0 0.3rem #4495F4;",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "&:hover": {
                boxShadow: "0 0 1rem #39F1FF, inset 0 0 0.5rem #39F1FF",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Основные бои
              </Typography>

              <Typography variant="body2">
                <br />
                Овладей классическими ритмами, такими как шестерка и восьмерка.
                Тренируйся под метроном и укрепляй свою технику
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                component={Link} // Используем Link для маршрутизации
                to="/patterns"
                size="small"
              >
                Смотреть
              </Button>
            </CardActions>
          </Card>
          <Card
            component="li"
            sx={{
              minWidth: 275,
              borderRadius: "1rem",
              border: "4px solid #4495F4", // Единственная рамка 4px
              boxShadow: "0 0 0.3rem #4495F4,inset 0 0 0.3rem #4495F4;",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "&:hover": {
                boxShadow: "0 0 1rem #39F1FF, inset 0 0 0.5rem #39F1FF",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Пользовательские бои
              </Typography>

              <Typography variant="body2">
                <br />
                Открой для себя самые популярные ритмы, созданные пользователями
                по всему миру. Учи и вдохновляйся уникальными идеями.
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                component={Link} // Используем Link для маршрутизации
                to="/custom"
                size="small"
              >
                Смотреть
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
