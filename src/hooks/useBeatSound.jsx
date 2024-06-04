import { useEffect } from "react";
import up from "./up.wav";
import down from "./down.wav";

const u = new Audio(up);
const d = new Audio(down);
export default function useBeatSound(
  activeBeatIndex,
  isPlaying,
  isBeatSound,
  beatPattern,
) {
  useEffect(() => {
    if (isPlaying && isBeatSound && beatPattern[activeBeatIndex] != "0") {
      if (activeBeatIndex % 2 === 0) {
        d.play();
      } else {
        u.play();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBeatIndex, beatPattern, isBeatSound, isPlaying]);
}
