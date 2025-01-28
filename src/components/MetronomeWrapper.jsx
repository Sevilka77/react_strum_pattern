import Metronome from "./Metronome";
import useTone from "../hooks/useTone";
import { useConfigSelector } from "../hooks/useConfigSelector";
import { useMemo } from "react";

function MetronomeWrapper() {
  const [beatPattern] = useConfigSelector((config) => config.beatPattern);
  const noteDuration = useConfigSelector((config) => config.noteDuration);
  useTone();

  const memoizedBeatPattern = useMemo(
    () => beatPattern.split(""),
    [beatPattern],
  );
  const memoizedNoteDuration = noteDuration;

  return (
    <Metronome
      noteDuration={memoizedNoteDuration}
      beatPattern={memoizedBeatPattern}
    />
  );
}

export default MetronomeWrapper;
