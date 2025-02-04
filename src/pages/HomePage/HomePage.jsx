import { Box, Container, Typography } from "@mui/material";

import Header from "../../features/header";
import CardItem from "./ui/CardItem";
import LDJson from "../../components/LDJson";

const cards = [
  {
    title: "Создай свой бой",
    description:
      "Создавай уникальные ритмы с помощью удобного конструктора. Настрой упражнения под себя и тренируйся эффективно.",
    color: "#FFD700",
    link: "/create",
  },
  {
    title: "Тренировка боя",
    description:
      "Тренируйся с 24 ритмическими заданиями. Улучши чувство ритма и отточи технику шаг за шагом.",
    color: "rgb(99, 179, 237)",
    link: "/learn",
  },
  {
    title: "Основные бои",
    description:
      "Изучи классические гитарные бои, такие как «Шестёрка» и «Восьмёрка». Тренируйся с метрономом для укрепления техники.",
    color: "rgb(72, 187, 120)",
    link: "/patterns",
  },
  {
    title: "Пользовательские бои",
    description:
      "Открывай популярные ритмы, созданные другими пользователями, и вдохновляйся уникальными идеями.",
    color: "rgb(237, 100, 166)",
    link: "/custom",
  },
];
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
            {cards.map(({ title, description, color, link }) => (
              <CardItem
                key={title}
                title={title}
                color={color}
                description={description}
                link={link}
              />
            ))}
          </Box>
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
