
import { useEffect } from "react";
import metronome_down from "./metronome_down.wav"


const audios =
  typeof window !== "undefined"
    ? new Audio(metronome_down)
    : [];

export class RecordedClickService {
  play() {

    const audio = audios;

    audio.play();
    audio.currentTime = 0;
  }
}

const recordedClickService = new RecordedClickService();



export default function useMetronomeSound(
  activeBeatIndex,
  note,
  isPlaying,
  isMetronomeSound
) {
  useEffect(() => {
    if (activeBeatIndex !== null && isPlaying && isMetronomeSound && (activeBeatIndex % note == 0)) recordedClickService.play()
  }
    , [activeBeatIndex, note, isPlaying, isMetronomeSound]
  );
}