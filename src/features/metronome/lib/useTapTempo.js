import { useState } from "react";

export default function useTapTempo(onTempoChange) {
  const [tapTimes, setTapTimes] = useState([]);

  const handleTap = () => {
    const currentTime = Date.now() / 1000;
    const newTapTimes = [...tapTimes, currentTime].slice(-4); // Ограничиваем количество тапов

    if (newTapTimes.length > 1) {
      const intervals = newTapTimes
        .slice(1)
        .map((time, index) => time - newTapTimes[index]);
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const calculatedBpm = Math.round(60 / avgInterval);

      onTempoChange(calculatedBpm);
    }

    setTapTimes(newTapTimes);
  };

  return handleTap;
}
