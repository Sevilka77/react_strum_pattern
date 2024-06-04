import { useEffect, useCallback } from "react";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

const cl1 = new Audio(click1);
const cl2 = new Audio(click2);
export default function useMetronomeSound(
  activeBeatIndex,
  isPlaying,
  isMetronomeSound,
  note,
) {
  const playSound = useCallback(() => {
    if (isPlaying && isMetronomeSound) {
      if (activeBeatIndex % note === 0) {
        cl2.play();
      } else {
        cl1.play();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBeatIndex, isMetronomeSound, isPlaying, note]);
  useEffect(() => {
    if (cl1 && cl2) {
      playSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playSound]);
}
