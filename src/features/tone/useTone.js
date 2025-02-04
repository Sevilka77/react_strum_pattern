import * as Tone from "tone";
import { useEffect, useRef, useCallback } from "react";

import { useSequenceSettings } from "@/entities/sequenceSettings/lib/useSequenceSettings";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import { useSoundSettings } from "@/entities/soundSettings/lib/useSoundSettings";
import { useChordSettings } from "@/entities/chordSettings/lib/useChordSettings";
import { useCycleSettings } from "@/entities/cycleSettings/lib/useCycleSettings";

import { sequenceGenerateSteps } from "./lib/sequenceUtil";
import { playHit, playInstruction, playMetronome } from "./lib/playUtils";

const useTone = () => {
  const { soundSettings } = useSoundSettings();
  const { toneSettings } = useToneSettings();
  const { sequenceSettings } = useSequenceSettings();
  const { chordSettings } = useChordSettings();
  const { beatPattern } = sequenceSettings;
  const { dispatch: cycleDispatch } = useCycleSettings();

  const seqRef = useRef(null);
  const stepsRef = useRef([]);

  // Генерация последовательности (seq) только при изменении аккорда или beatPattern
  useEffect(() => {
    stepsRef.current = sequenceGenerateSteps(
      beatPattern,
      chordSettings.currentChord,
    );
  }, [beatPattern, chordSettings.currentChord]);

  // Управление BPM только при изменении config.tempo
  useEffect(() => {
    Tone.getTransport().bpm.value = toneSettings.tempo || 120;
  }, [toneSettings.tempo]);

  // Логика воспроизведения звука (handleSequence)
  const handleStepSequence = useCallback(
    (time, index) => {
      const sound = stepsRef.current[index].instructions;
      const timeWithOffset = time + 0.1;

      Tone.getDraw().schedule(() => {
        cycleDispatch({ type: "SET_ACTIVE_BEAT", payload: index });
        if (index === stepsRef.current.length - 1) {
          cycleDispatch({ type: "INCREMENT_CYCLE" });
        }
      }, timeWithOffset + 0.1);

      if (soundSettings.isBeatSound) {
        playInstruction(sound, timeWithOffset, soundSettings.isBeatSound);
      }
      if (soundSettings.isHitSound) {
        playHit(sound, timeWithOffset);
      }
      if (soundSettings.isMetronomeSound) {
        playMetronome(
          timeWithOffset,
          index,
          soundSettings.clickMainBeat,
          soundSettings.clickSubbeat,
          soundSettings.clickTaktBeat,
          toneSettings.noteDuration,
        );
      }
    },
    [
      soundSettings.isBeatSound,
      soundSettings.isHitSound,
      soundSettings.isMetronomeSound,
      soundSettings.clickMainBeat,
      soundSettings.clickSubbeat,
      soundSettings.clickTaktBeat,
      cycleDispatch,
      toneSettings.noteDuration,
    ],
  );

  // Управление воспроизведением (isPlaying)
  useEffect(() => {
    if (!toneSettings.isPlaying) {
      Tone.getTransport().stop();
      cycleDispatch({ type: "SET_ACTIVE_BEAT", payload: null });
      return;
    }

    Tone.start().then(() => {
      Tone.getTransport().start();
    });

    // Создаем новую последовательность, если она еще не создана или изменилась
    if (!seqRef.current || seqRef.current.length !== stepsRef.current.length) {
      if (seqRef.current) {
        seqRef.current.dispose(); // Очищаем предыдущую последовательность
      }

      seqRef.current = new Tone.Sequence(
        handleStepSequence,
        Array.from({ length: stepsRef.current.length }, (_, i) => i),
        toneSettings.noteDuration || "8n",
      ).start(0);
    }

    return () => {
      if (seqRef.current) {
        seqRef.current.dispose();
      }
      cycleDispatch({ type: "RESET_CYCLE" });
    };
  }, [
    toneSettings.noteDuration,
    handleStepSequence,
    cycleDispatch,
    toneSettings.isPlaying,
  ]);

  return;
};

export default useTone;
