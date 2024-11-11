import { useMemo } from "react";
import MetronomeBeat from "./MetronomeBeat";
import MetronomeBeatName from "./MetronomeBeatName";
import Grid from "@mui/material/Grid2";

import { memo } from "react";

import {
  ArrowD,
  ArrowDB,
  ArrowDH,
  ArrowU,
  ArrowUH,
  ArrowUB,
  XDownIcon,
  XUpIcon,
  XIcon,
} from "./Icons";

const MetronomeNM = ({ noteDuration, beatPattern, activeBeat }) => {
  const beats = beatPattern;

  // Вычисляем иконки один раз для всех тактов
  const icons = useMemo(() => {
    return beats.map((beat, index) => {
      const isUp = index % 2 !== 0;
      switch (beat) {
        case "0":
          return isUp ? (
            <ArrowU color="disabled" />
          ) : (
            <ArrowD color="disabled" />
          );
        case "1":
          return isUp ? <ArrowU color="primary" /> : <ArrowD color="primary" />;
        case "b":
          return isUp ? (
            <ArrowUB color="primary" />
          ) : (
            <ArrowDB color="primary" />
          );
        case "h":
          return isUp ? (
            <ArrowUH color="primary" />
          ) : (
            <ArrowDH color="primary" />
          );
        case "A":
          return isUp ? <ArrowU color="warning" /> : <ArrowD color="warning" />;
        case "x":
          return <XIcon color="primary" />;
        case "c":
          return isUp ? (
            <XUpIcon color="primary" />
          ) : (
            <XDownIcon color="primary" />
          );
        default:
          return null;
      }
    });
  }, [beats]);

  return (
    <Grid
      component="main"
      container
      columns={8}
      alignItems="center" // Вертикальное выравнивание по центру
      justifyContent="center"
    >
      {beats.map((b, index) => (
        <Grid
          key={index}
          size={{ xs: 2, sm: 1, md: 1 }}
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "max-content",

            // border: "1px solid #60ff90",
          }}
        >
          <MetronomeBeatName id={index} noteDuration={noteDuration} />
          <MetronomeBeat
            icon={icons[index]} // Передаем готовую иконку
            active={activeBeat === index}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const Metronome = memo(MetronomeNM);
export default Metronome;
