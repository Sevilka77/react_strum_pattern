import { useEffect } from "react";
import Metronome from "./Metronome";
import useTone from "../hooks/useTone";
import { useConfig } from "../useConfig";

function MetronomeWrapper({ isSmallDevice }) {
  const { config } = useConfig();
  const { beatPattern } = config;
  const [activeBeat] = useTone(config, beatPattern.split(""));

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
      beatPattern={beatPattern.split("")}
      activeBeat={activeBeat}
    />
  );
}

export default MetronomeWrapper;
