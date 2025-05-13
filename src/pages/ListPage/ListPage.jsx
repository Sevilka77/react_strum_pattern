import { lazy, Suspense } from "react";
import { patterns } from "../../app/providers/patterns";

import TopBarLoader from "@/shared/ui/TopBarLoader";

import Header from "../../features/header";
import { Container } from "@mui/material";
import MetaData from "@/shared/lib/seo/MetaData";

const PatternList = lazy(() => import("./ui/PatternList"));

function ListPage({ level }) {
  const filteredPatterns = patterns.filter((p) => p.level === level);
  return (
    <>
      {level === "main" ? (
        <MetaData
          title="Схемы гитарных боев: Шестерка, Восьмерка, Галоп и другие – Полный список"
          description="Все популярные схемы гитарных боев: Шестерка, Восьмерка, Галоп, Дворовый бой и другие. Начните тренировки с простых боев и переходите к более сложным!"
        />
      ) : (
        <MetaData
          title="Пользовательские схемы гитарных боев: Варвара, Кино, Сплин, Гитара с нуля и другие"
          description="Откройте уникальные схемы боев, созданные пользователями. Попробуйте боевые ритмы для популярных песен: Варвара, Кино, Сплин и другие!"
        />
      )}
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
        <Suspense fallback={<TopBarLoader />}>
          <PatternList patterns={filteredPatterns} />
        </Suspense>
      </Container>
    </>
  );
}

export default ListPage;
