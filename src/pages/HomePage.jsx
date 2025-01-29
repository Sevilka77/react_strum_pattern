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

import { Link } from "react-router-dom";
import LDJson from "../components/LDJson";

const CardButton = styled(Button)({
  backgroundColor: "rgb(55,65,81)",
  width: "100%",
  textTransform: "uppercase",
  borderRadius: "4px",
  color: "#FFF",

  "&:hover": {
    backgroundColor: "rgb(75,85,99)", // Цвет текста при наведении
  },
});

function HomePage() {
  const ldData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://strumming.ru",
    name: "Strumming - Онлайн тренажер гитарного боя",
    description:
      "Онлайн тренажер гитарного боя. Освойте схемы гитарных боев: шестерка, восьмерка, четверка, бой галоп.",
    potentialAction: [
      {
        "@type": "ViewAction",
        target: "https://strumming.ru/create",
        name: "Создать гитарный бой",
      },
      {
        "@type": "ViewAction",
        target: "https://strumming.ru/learn",
        name: "Изучить гитарный бой",
      },
      {
        "@type": "ViewAction",
        target: "https://strumming.ru/patterns",
        name: "Список схем гитарного боя",
      },
      {
        "@type": "ViewAction",
        target: "https://strumming.ru/custom",
        name: "Пользовательские схемы боя",
      },
    ],
  };
  return (
    <>
      <LDJson data={ldData} />
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
              color: "rgb(156, 153, 175)",
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
                backgroundColor: "rgb(31,41,55)",
                minWidth: 275,
                borderRadius: "8px",

                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography
                  textAlign="center"
                  color="#FFD700"
                  variant="h5"
                  component="h2"
                  marginBottom={2}
                >
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
                backgroundColor: "rgb(31,41,55)",
                minWidth: 275,
                borderRadius: "8px",

                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography
                  textAlign="center"
                  color="rgb(99, 179, 237)"
                  variant="h5"
                  component="h2"
                  marginBottom={2}
                >
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
                backgroundColor: "rgb(31,41,55)",
                minWidth: 275,
                borderRadius: "8px",

                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography
                  textAlign="center"
                  color="rgb(72, 187, 120)"
                  variant="h5"
                  component="h2"
                  marginBottom={2}
                >
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
                backgroundColor: "rgb(31,41,55)",
                minWidth: 275,
                borderRadius: "8px",

                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography
                  textAlign="center"
                  color="rgb(237, 100, 166)"
                  variant="h5"
                  component="h2"
                  marginBottom={2}
                >
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
