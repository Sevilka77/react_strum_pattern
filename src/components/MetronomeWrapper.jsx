import Metronome from "./Metronome";
import useTone from "../hooks/useTone";
import { useConfig } from "../hooks/useConfig";
import { useMemo } from "react";

function MetronomeWrapper() {
  const { config } = useConfig();
  const { beatPattern, noteDuration } = config;
  useTone(config);

  const memoizedBeatPattern = useMemo(
    () => beatPattern.split(""),
    [beatPattern],
  );
  const memoizedNoteDuration = useMemo(() => noteDuration, [noteDuration]);

  return (
    <Metronome
      noteDuration={memoizedNoteDuration}
      beatPattern={memoizedBeatPattern}
    />
  );
}

export default MetronomeWrapper;
