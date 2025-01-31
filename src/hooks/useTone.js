import * as Tone from "tone";
import { useEffect, useRef } from "react";
import useCycle from "./useCycle";

import useConfig from "./useConfig";
import useBeatPattern from "./useBeatPattern";
import { sequenceGenerateSteps } from "@/features/tone/lib/sequenceUtil";
import {
  playHit,
  playInstruction,
  playMetronome,
} from "@/features/tone/lib/playUtils";

const useTone = () => {
  const { config } = useConfig();
  const { beatPattern } = useBeatPattern();
  const { incrementCycle, resetCycle, setActiveBeat } = useCycle();

  const seqRef = useRef(null);

  useEffect(() => {
    if (!config.isPlaying) {
      // Если воспроизведение остановлено, останавливаем Tone.Transport и сбрасываем состояние
      Tone.getTransport().stop();
      setActiveBeat(null);
      return;
    }

    // Запускаем Tone.js и настраиваем BPM
    Tone.start().then(() => {
      Tone.getTransport().bpm.value = config.tempo || 120;
      Tone.getTransport().start();
    });
    const steps = sequenceGenerateSteps(beatPattern, config.currentChord);
    // console.log(steps);

    const seq = new Tone.Sequence(
      (time, index) => {
        const sound = steps[index].instructions;
        const timeWithOfset = time + 0.1;

        Tone.getDraw().schedule(() => {
          setActiveBeat(index);
        }, timeWithOfset + 0.1);

        if (config.isBeatSound) {
          playInstruction(sound, timeWithOfset, config.isBeatSound);
        }
        if (config.isHitSound) {
          playHit(sound, timeWithOfset);
        }
        if (config.isMetronomeSound) {
          playMetronome(
            timeWithOfset,
            index,
            config.clickMainBeat,
            config.clickSubbeat,
            config.clickTaktBeat,
            config.noteDuration,
          );
        }
        if (index === steps.length - 1) {
          incrementCycle(); // Увеличиваем цикл, когда начинается новый
        }
      },

      Array.from({ length: steps.length }, (_, i) => i),
      config.noteDuration || "8n",
    ).start(0);
    seqRef.current = seq;

    return () => {
      seq.dispose();
      resetCycle();
    };
  }, [
    config.isPlaying,
    beatPattern,
    config.isBeatSound,
    config.isHitSound,
    config.isMetronomeSound,
    config.isDownbeatSound,
    config.isUpbeatSound,
    config.isAcsentbeatSound,
    config.tempo,
    config.noteDuration,
    config.clickMainBeat,
    config.clickSubbeat,
    config.clickTaktBeat,
    config.currentChord,
    setActiveBeat,
    incrementCycle,
    resetCycle,
  ]);
  return;
};
export default useTone;
