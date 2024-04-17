
import { useEffect } from "react";
import click1 from "./click1.wav"
import click2 from "./click2.wav"

export default function useMetronomeSound(activeBeatIndex, isPlaying, isMetronomeSound, note) {
  const cl1 = new Audio(click1)
  const cl2 = new Audio(click2)
  useEffect(() => {
    if (isPlaying && isMetronomeSound) {
      console.log(activeBeatIndex % note)
      if (activeBeatIndex % note === 0) {
        cl2.play()
      } else {
        cl1.play();
      }
    }

  }, [activeBeatIndex, isMetronomeSound, isPlaying, note])

}
