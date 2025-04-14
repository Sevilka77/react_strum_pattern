import Header from "../features/header";
import LDJson from "../components/LDJson";
import { lazy, Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
const MetronomeWrapper = lazy(() =>
  import("@/widgets/metronomePlayer").then((module) => ({
    default: module.MetronomePlayer,
  }))
);
// import VolumeControl from "../components/VolumeControl";

import { useEffect, useState } from "react";
import ControlFooter from "@/features/metronome/ui/ControlFooter";
import { patterns } from "@/app/providers/patterns";
import { Container } from "@mui/material";
import { useSequenceSettings } from "@/entities/sequenceSettings/lib/useSequenceSettings";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";

function PatternPage() {
  const location = useLocation();
  const { beatPattern } = useParams();
  const { dispatch: toneDispatch } = useToneSettings();
  const { sequenceSettings, dispatch: sequenceDispatch } =
    useSequenceSettings();

  const { pattern } = sequenceSettings;

  const p = location.state;
  const [title, setTitle] = useState("Выбор боя");
  const [patternImage, setPatternImage] = useState("");
  const [ldData, setLdData] = useState({});

  useEffect(() => {
    if (p) {
      setTitle(p.title || "Пользовательский бой");
      sequenceDispatch({ type: "SET_BEAT_PATTERN", payload: p.pattern });

      toneDispatch({ type: "SET_NOTE_DURATION", payload: p.note });
      toneDispatch({ type: "SET_TEMPO", payload: p.temp });
    } else if (beatPattern) {
      const foundPattern = patterns.find(
        (pattern) => pattern.pattern === beatPattern
      );

      if (foundPattern) {
        setTitle(foundPattern.title || "Выбор боя"); // Заголовок по умолчанию
        sequenceDispatch({
          type: "SET_BEAT_PATTERN",
          payload: foundPattern.pattern,
        });

        toneDispatch({ type: "SET_NOTE_DURATION", payload: foundPattern.note });
        toneDispatch({ type: "SET_TEMPO", payload: foundPattern.temp });

        const imageUrl = `https://strumming.ru/assets/images/svg/${foundPattern.image}`;
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
        sequenceDispatch({
          type: "SET_BEAT_PATTERN",
          payload: beatPattern,
        });
      }
    } else {
      console.log("Pattern не передан, используется значение по умолчанию");
      sequenceDispatch({
        type: "SET_BEAT_PATTERN",
        payload: pattern,
      });
    }

    // Очистка состояния при размонтировании компонента, если нужно
    return;
  }, [p, beatPattern, pattern, patternImage, toneDispatch, sequenceDispatch]);

  return (
    <>
      <Header title={title} />
      <LDJson data={ldData} />
      {/* <OGMetaTags title={title} image={patternImage} /> */}
      <Container
        component="main"
        sx={{
          flex: 1,
          display: "flex",
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
