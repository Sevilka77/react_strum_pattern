
import { useEffect } from "react";
import up from "./up.mp3"
import down from "./down.mp3"


const audios =
  typeof window !== "undefined"
    ? [new Audio(down), new Audio(up)]
    : [];

export class RecordedClickService {
  play(id) {
    const isUp = id % 2
    const audio = audios[isUp];

    audio.play();
    audio.currentTime = 0;
  }
}

const recordedClickService = new RecordedClickService();



export default function usePlayActiveSound(
  activeBeatIndex,
  beatPattern,
  isPlaying,
  isBeatSound
) {
  useEffect(() => {
    if (activeBeatIndex !== null && isPlaying && isBeatSound && (beatPattern[activeBeatIndex] == "work")) recordedClickService.play(activeBeatIndex);
  }
    , [activeBeatIndex, beatPattern, isPlaying, isBeatSound]
  );
}