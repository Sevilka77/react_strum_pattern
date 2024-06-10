import { useEffect } from "react";
import Metronome from "./Metronome";
import useTone from "../hooks/useTone";

function MetronomeWrapper({ config, isSmallDevice, beatPattern }) {
  const [activeBeat] = useTone(config, beatPattern);

  useEffect(
    () => {
      // Логика изменения параметров или паттерна, если нужно
    },
    [
      /* зависимости */
    ],
  );

  return (
    <Metronome
      config={config}
      isSmd={isSmallDevice}
      beatPattern={beatPattern}
      activeBeat={activeBeat}
    />
  );
}

export default MetronomeWrapper;
