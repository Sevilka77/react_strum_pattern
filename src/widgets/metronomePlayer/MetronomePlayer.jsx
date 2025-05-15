import Metronome from "@/features/metronome/ui/Metronome";
import useTone from "@/features/Tone/useTone";
import { useEffect } from "react";

import { loadAllChordsSamples } from "@/features/tone/lib/samplesUtil";

import { useMemo } from "react";
import { useSequenceSettings } from "@/entities/sequenceSettings/lib/useSequenceSettings";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";

export const MetronomePlayer = () => {
  const { sequenceSettings } = useSequenceSettings();
  const { beatPattern } = sequenceSettings;
  const { toneSettings } = useToneSettings();
  useTone();

  const memoizedBeatPattern = useMemo(
    () => beatPattern.split(""),
    [beatPattern]
  );
  const memoizedNoteDuration = useMemo(
    () => toneSettings.noteDuration,
    [toneSettings.noteDuration]
  );
  useEffect(() => {
    loadAllChordsSamples(); // Загружаем сэмплы один раз
  }, []);

  return (
    <Metronome
      noteDuration={memoizedNoteDuration}
      beatPattern={memoizedBeatPattern}
    />
  );
};
