import Metronome from "./Metronome";
import useTone from "../hooks/useTone";
import { useConfig } from "../useConfig";
import { useMemo } from "react";

function MetronomeWrapper() {
  const { config } = useConfig();
  const { beatPattern, noteDuration } = config;

  const activeBeat = useTone(config);

  const memoizedBeatPattern = useMemo(
    () => beatPattern.split(""),
    [beatPattern],
  );
  const memoizedNoteDuration = useMemo(() => noteDuration, [noteDuration]);

  return (
    <Metronome
      noteDuration={memoizedNoteDuration}
      beatPattern={memoizedBeatPattern}
      activeBeat={activeBeat}
    />
  );
}

export default MetronomeWrapper;
