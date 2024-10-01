import { useMemo } from "react";
import MetronomeBeat from "./MetronomeBeat";
import MetronomeBeatName from "./MetronomeBeatName";
import { Grid } from "@mui/material";
import { memo } from "react";
import { Paper } from "@mui/material";
import { ArrowD, ArrowU, XDownIcon, XUpIcon, XIcon } from "./Icons";

const MetronomeNM = ({ noteSize, isSmd, beatPattern, activeBeat }) => {
  let fSize = isSmd ? 14 : 6;
  const beats = beatPattern;
  const columns = isSmd ? 4 : 16;
  // Вычисляем иконки один раз для всех тактов
  const icons = useMemo(() => {
    return beats.map((beat, index) => {
      const isUp = index % 2 !== 0;
      switch (beat) {
        case "0":
          return isUp ? (
            <ArrowU fontSize="inherit" color="disabled" />
          ) : (
            <ArrowD fontSize="inherit" color="disabled" />
          );
        case "1":
          return isUp ? (
            <ArrowU fontSize="inherit" color="primary" />
          ) : (
            <ArrowD fontSize="inherit" color="primary" />
          );
        case "A":
          return isUp ? (
            <ArrowU fontSize="inherit" color="warning" />
          ) : (
            <ArrowD fontSize="inherit" color="warning" />
          );
        case "x":
          return <XIcon fontSize="inherit" color="primary" />;
        case "c":
          return isUp ? (
            <XUpIcon fontSize="inherit" color="primary" />
          ) : (
            <XDownIcon fontSize="inherit" color="primary" />
          );
        default:
          return null;
      }
    });
  }, [beats]);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }} justifyContent="center">
      {beats.map((b, index) => (
        <Grid item xs={12 / columns} key={index}>
          {/* Разбиваем на строки по 4 или 2 элемента */}
          <Paper elevation={3} sx={{ borderRadius: "8px" }}>
            <MetronomeBeatName id={index} noteSize={noteSize} fSize={fSize} />
            <MetronomeBeat
              id={index}
              icon={icons[index]} // Передаем готовую иконку
              fSize={fSize}
              active={activeBeat === index}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

const Metronome = memo(MetronomeNM);
export default Metronome;
