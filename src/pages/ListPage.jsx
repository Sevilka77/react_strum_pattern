import { lazy, Suspense } from "react";
import { patterns } from "../provider/patterns";

import Header from "../components/Header";
import { Container } from "@mui/material";
import LDJson from "../components/LDJson";

const PatternList = lazy(() => import("../components/PatternList"));

function ListPage({ level }) {
  const filteredPatterns = patterns.filter((p) => p.level === level);

  const ldData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name:
      level === "main"
        ? "Схемы гитарных боев"
        : "Пользовательские гитарные бои",
    description:
      level === "main"
        ? "Изучите основные схемы гитарных боев, такие как Шестерка, Восьмерка, Галоп и другие."
        : "Откройте для себя уникальные и пользовательские гитарные бои, созданные сообществом Strumming.",
    url:
      level === "main"
        ? `https://strumming.ru/patterns`
        : `https://strumming.ru/custom`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        level === "main"
          ? `https://strumming.ru/patterns`
          : `https://strumming.ru/custom`,
    },
    itemListElement: filteredPatterns.map((pattern, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: pattern.title,
        description: `Схема для гитарного боя ${pattern.title}`,
        url: `https://strumming.ru/patterns/${pattern.pattern}`,
        image: `https://strumming.ru/assets/images/svg/${pattern.image}`,
      },
    })),
  };

  return (
    <>
      <LDJson data={ldData} />
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
          <PatternList patterns={filteredPatterns} />
        </Suspense>
      </Container>
    </>
  );
}

export default ListPage;
