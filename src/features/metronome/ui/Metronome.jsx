import { useMemo } from "react";
import MetronomeBeatIcon from "./MetronomeBeatIcon";
import MetronomeBeatName from "./MetronomeBeatName";
import PatternEdit from "@/components/PatternEdit";
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
} from "@/shared/ui/Icons/Icons";
import useCycle from "@/hooks/useCycle";

import useConfigSelector from "@/hooks/useConfigSelector";

const MetronomeNM = ({ noteDuration, beatPattern }) => {
  const [editMode] = useConfigSelector((config) => config.editMode);
  const beats = beatPattern;
  const { activeBeat } = useCycle();

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
    <>
      <Grid
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
            }}
          >
            <MetronomeBeatName id={index} noteDuration={noteDuration} />
            <MetronomeBeatIcon
              icon={icons[index]} // Передаем готовую иконку
              active={activeBeat === index}
            />
            {editMode && <PatternEdit index={index} />}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const Metronome = memo(MetronomeNM);
export default Metronome;
