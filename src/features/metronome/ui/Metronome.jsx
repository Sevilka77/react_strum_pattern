import { useMemo } from "react";
import MetronomeBeatIcon from "./MetronomeBeatIcon";
import MetronomeBeatName from "./MetronomeBeatName";
import PatternEdit from "./patternEdit";
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

import { useEditMode } from "@/entities/editMode/lib/useEditMode";

const getBeatIcon = (beat, isUp) => {
  switch (beat) {
    case "0":
      return isUp ? <ArrowU color="disabled" /> : <ArrowD color="disabled" />;
    case "1":
      return isUp ? <ArrowU color="primary" /> : <ArrowD color="primary" />;
    case "b":
      return isUp ? <ArrowUB color="primary" /> : <ArrowDB color="primary" />;
    case "h":
      return isUp ? <ArrowUH color="primary" /> : <ArrowDH color="primary" />;
    case "A":
      return isUp ? <ArrowU color="warning" /> : <ArrowD color="warning" />;
    case "x":
      return <XIcon color="primary" />;
    case "c":
      return isUp ? <XUpIcon color="primary" /> : <XDownIcon color="primary" />;
    default:
      return null;
  }
};

const MetronomeNM = ({ noteDuration, beatPattern }) => {
  const { editMode } = useEditMode();

  const beats = beatPattern;

  const icons = useMemo(() => {
    return beatPattern.map((beat, index) => {
      const isUp = index % 2 !== 0;
      return getBeatIcon(beat, isUp);
    });
  }, [beatPattern]);

  return (
    <>
      <Grid
        container
        columns={8}
        alignContent="center"
        alignItems="center" // Вертикальное выравнивание по центру
        justifyContent="center"
        flexGrow="1"
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
              id={index}
              icon={icons[index]} // Передаем готовую иконку
            />
            {editMode.edit && <PatternEdit index={index} />}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const Metronome = memo(MetronomeNM);
export default Metronome;
