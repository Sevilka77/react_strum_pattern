import { useEffect, useRef, useState } from "react";

import * as Tone from "tone";
import up from "./up.wav";
import down from "./down.wav";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

const keys = new Tone.Players({
  urls: { up: up, down: down, click1: click1, click2: click2 },
  onload: () => console.log("loaded"),
}).toDestination();

const playNote = (
  time,
  note,
  beatPattern,
  isBeatSound,
  isMetronomeSound,
  noteSize,
) => {
  if (isBeatSound && beatPattern[note] !== "0") {
    if (note % 2 === 0) {
      keys.player("down").start(time);
    } else {
      keys.player("up").start(time);
    }
  }
  if (isMetronomeSound) {
    if (note % noteSize === 0) {
      keys.player("click1").start(time);
    } else {
      keys.player("click2").start(time);
    }
  }
};

const seq = new Tone.Sequence(playNote, [], "4n").start(0);

function countSteps(beats) {
  return beats.map((value, index) => index);
}

export default function useTone(config, beatPattern) {
  const [activeBeat, setActiveBeat] = useState(0);
  Tone.getTransport().bpm.value = config.tempo || 120;
  const seqRef = useRef(seq);

  useEffect(() => {
    if (config.isPlaying) {
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
    }
  }, [config.isPlaying]);

  useEffect(() => {
    seqRef.current.callback = (time, note) => {
      playNote(
        time,
        note,
        beatPattern,
        config.isBeatSound,
        config.isMetronomeSound,
        config.noteSize || 4,
      );
      setActiveBeat(note);
    };
    seqRef.current.events = countSteps(beatPattern);
  }, [
    beatPattern,
    config.isBeatSound,
    config.isMetronomeSound,
    config.noteSize,
  ]);

  return [activeBeat];
}
