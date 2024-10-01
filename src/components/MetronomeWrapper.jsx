import Metronome from "./Metronome";
import useTone from "../hooks/useTone";
import { useConfig } from "../useConfig";
import { useMemo } from "react";

function MetronomeWrapper({ isSmallDevice }) {
  const { config } = useConfig();
  const { beatPattern, noteSize } = config;
  const activeBeat = useTone(config);

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
