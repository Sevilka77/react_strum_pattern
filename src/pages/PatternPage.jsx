import Header from "../components/Header";
import LDJson from "../components/LDJson";
import { lazy, Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
const MetronomeWrapper = lazy(() => import("../components/MetronomeWrapper"));

// import VolumeControl from "../components/VolumeControl";

import { useConfig } from "../hooks/useConfig";
import { useEffect, useState } from "react";
import ControlFooter from "../components/ControlFooter";
import { patterns } from "../provider/patterns";
import { Container } from "@mui/material";
// import OGMetaTags from "../components/OGMetaTags";

// Функция для обновления Open Graph мета-тегов
// const updateOGMetaTags = (title, image, pattern) => {
//   let metaOGTitle = document.querySelector('meta[property="og:title"]');
//   if (metaOGTitle) {
//     metaOGTitle.setAttribute("content", `Схема гитарного боя - ${title}`);
//   } else {
//     metaOGTitle = document.createElement("meta");
//     metaOGTitle.setAttribute("property", "og:title");
//     metaOGTitle.setAttribute("content", `Схема гитарного боя - ${title}`);
//     document.head.appendChild(metaOGTitle);
//   }

//   let metaOGDescription = document.querySelector(
//     'meta[property="og:description"]',
//   );
//   if (metaOGDescription) {
//     metaOGDescription.setAttribute(
//       "content",
//       `Схема для гитарного боя ${title}, подходящая для практики`,
//     );
//   } else {
//     metaOGDescription = document.createElement("meta");
//     metaOGDescription.setAttribute("property", "og:description");
//     metaOGDescription.setAttribute(
//       "content",
//       `Схема для гитарного боя ${title}, подходящая для практики`,
//     );
//     document.head.appendChild(metaOGDescription);
//   }

//   let metaOGImage = document.querySelector('meta[property="og:image"]');
//   if (metaOGImage) {
//     metaOGImage.setAttribute("content", image);
//   } else {
//     metaOGImage = document.createElement("meta");
//     metaOGImage.setAttribute("property", "og:image");
//     metaOGImage.setAttribute("content", image);
//     document.head.appendChild(metaOGImage);
//   }
// };

function PatternPage() {
  const location = useLocation();
  const { beatPattern } = useParams();
  const { config, dispatch } = useConfig();
  const p = location.state;
  const [title, setTitle] = useState("Выбор боя");
  const [patternImage, setPatternImage] = useState("");
  const [ldData, setLdData] = useState({});

  useEffect(() => {
    if (p) {
      setTitle(p.title || "Пользовательский бой");
      dispatch({ type: "setBeatPattern", data: p.pattern });
      dispatch({ type: "setNoteDuration", data: p.note });
      dispatch({ type: "setTempo", data: p.temp });
    } else if (beatPattern) {
      const foundPattern = patterns.find(
        (pattern) => pattern.pattern === beatPattern,
      );

      if (foundPattern) {
        setTitle(foundPattern.title || "Выбор боя"); // Заголовок по умолчанию
        dispatch({ type: "setBeatPattern", data: foundPattern.pattern });
        dispatch({ type: "setNoteDuration", data: foundPattern.note });
        dispatch({ type: "setTempo", data: foundPattern.temp });

        const imageUrl = `/assets/images/svg/${foundPattern.image}`;
        setPatternImage(imageUrl); // Обновляем состояние с изображением
        // updateOGMetaTags(foundPattern.title, imageUrl, foundPattern.pattern);
        // // Обновляем LD-разметку
        const newLdData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `https://strumming.ru/pattern/${foundPattern.pattern}`,
          url: `https://strumming.ru/pattern/${foundPattern.pattern}`,
          name: `${foundPattern.title}`,
          description: `Схема для гитарного боя ${foundPattern.title}`,
          image: {
            "@type": "ImageObject",
            url: imageUrl,
          },
          mainEntityOfPage: `https://strumming.ru/pattern/${foundPattern.pattern}`,
        };
        setLdData(newLdData);
      } else {
        console.log("Паттерн не найден в массиве patterns.");
        setTitle("Пользовательский бой");
        dispatch({ type: "setBeatPattern", data: beatPattern });
      }
    } else {
      console.log("Pattern не передан, используется значение по умолчанию");
      dispatch({ type: "setBeatPattern", data: config.defaultPattern });
    }

    // Очистка состояния при размонтировании компонента, если нужно
    return () => {
      dispatch({ type: "clearPattern" }); // Сбрасываем паттерн
    };
  }, [dispatch, p, beatPattern, config.defaultPattern, patternImage]);

  return (
    <>
      <Header title={title} />
      <LDJson data={ldData} />
      {/* <OGMetaTags title={title} image={patternImage} /> */}
      <Container
        component="main"
        sx={{
          display: "flex",
          minHeight: "80dvh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="xl"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <MetronomeWrapper />
        </Suspense>

        {/* <VolumeControl /> */}
        <ControlFooter />
      </Container>
    </>
  );
}

export default PatternPage;
