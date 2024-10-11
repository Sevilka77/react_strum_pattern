import Metronome from "./Metronome";
import useTone from "../hooks/useTone";
import { useConfig } from "../useConfig";
import { useMemo } from "react";
import { useMediaQuery } from "@mui/material";
function MetronomeWrapper() {
  const { config } = useConfig();
  const { beatPattern, noteSize } = config;
  const activeBeat = useTone(config);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const memoizedBeatPattern = useMemo(
    () => beatPattern.split(""),
    [beatPattern],
  );
  const memoizedNoteSize = useMemo(() => noteSize, [noteSize]);

  return (
    <Metronome
      noteSize={memoizedNoteSize}
      isSmd={isSmallDevice}
      beatPattern={memoizedBeatPattern}
      activeBeat={activeBeat}
    />
  );
}

export default MetronomeWrapper;
