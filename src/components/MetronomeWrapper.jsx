import Metronome from "@/features/metronome/ui/Metronome";
import useTone from "@/hooks/useTone";
import useConfigSelector from "@/hooks/useConfigSelector";
import { useMemo } from "react";
import useBeatPattern from "@/hooks/useBeatPattern";

function MetronomeWrapper() {
  const { beatPattern } = useBeatPattern();
  const [noteDuration] = useConfigSelector((config) => config.noteDuration);
  useTone();

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
