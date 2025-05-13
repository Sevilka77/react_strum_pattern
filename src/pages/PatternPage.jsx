import Header from "../features/header";

import TopBarLoader from "@/shared/ui/TopBarLoader";
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
import MetaData from "../shared/lib/seo/MetaData";
function getMetaData(title, level) {
  if (level === "main") {
    return {
      seoTitle: `Схема гитарного боя ${title} – ритм и техника исполнения`,
      seoDescription: `Изучите гитарный бой «${title}». Подробная схема боя, советы по технике, темп и ритм. Идеально для самостоятельной практики и отработки правой руки.`,
    };
  } else {
    return {
      seoTitle: `Пользовательская схема боя «${title}» – уникальный гитарный ритм`,
      seoDescription: `Попробуйте бой «${title}» из пользовательской коллекции. Авторский подход, оригинальная схема боя и тренировочный темп для гитары.`,
    };
  }
}

function PatternPage() {
  const location = useLocation();
  const { beatPattern } = useParams();
  const { dispatch: toneDispatch } = useToneSettings();
  const { sequenceSettings, dispatch: sequenceDispatch } =
    useSequenceSettings();

  const { pattern } = sequenceSettings;

  const p = location.state;

  const foundPattern = beatPattern
    ? patterns.find((pattern) => pattern.pattern === beatPattern)
    : null;

  const meta = getMetaData(
    foundPattern?.title || p?.title || "Гитарный бой",
    foundPattern?.level || p?.level || "custom"
  );

  const [title, setTitle] = useState("Выбор боя");

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
  }, [p, beatPattern, pattern, toneDispatch, sequenceDispatch, foundPattern]);

  return (
    <>
      <MetaData title={meta.seoTitle} description={meta.seoDescription} />
      <Header title={title} />
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
        <Suspense fallback={<TopBarLoader />}>
          <MetronomeWrapper />
        </Suspense>

        {/* <VolumeControl /> */}
        <ControlFooter />
      </Container>
    </>
  );
}

export default PatternPage;
