import { useEffect, useRef, useState } from "react";

import * as Tone from "tone";
import up from "./up.wav";
import down from "./down.wav";
import upA from "./upA.wav";
import downA from "./downA.wav";
import upM from "./upM.wav";
import downM from "./downM.wav";
import x from "./X.wav";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

// Создание Tone.Players для воспроизведения звуков
const keys = new Tone.Players({
  urls: {
    up: up,
    down: down,
    upA: upA,
    downA: downA,
    upM: upM,
    downM: downM,
    x: x,
    click1: click1,
    click2: click2,
  },
  onload: () => console.log("loaded"), // Обработчик загрузки
}).toDestination(); // Отправка звуков на выход аудио

const actions = {
  1: (note, time) =>
    note % 2 === 0
      ? keys.player("down").start(time)
      : keys.player("up").start(time),
  c: (note, time) =>
    note % 2 === 0
      ? keys.player("downM").start(time)
      : keys.player("upM").start(time),
  x: (note, time) => keys.player("x").start(time),
  A: (note, time) =>
    note % 2 === 0
      ? keys.player("downA").start(time)
      : keys.player("upA").start(time),
};
// Функция для воспроизведения ноты
const playNote = (
  time,
  note,
  beatPattern,
  isBeatSound,
  isMetronomeSound,
  isDownbeatSound,
  isUpbeatSound,
  isAcsentbeatSound,
  noteSize,
) => {
  // Проверка наличия звука для бита и его воспроизведение
  if (isBeatSound && beatPattern[note] in actions) {
    actions[beatPattern[note]](note, time);
  }
  // Проверка наличия метронома и его воспроизведение isDownbeatSound
  if (isMetronomeSound) {
    if (note % noteSize === 0 && isAcsentbeatSound) {
      keys.player("click2").start(time);
    } else {
      if (noteSize > 5) {
        if (note % 2 != 0 && isUpbeatSound) {
          keys.player("click1").start(time);
        }
        if (note % 2 == 0 && isDownbeatSound) {
          keys.player("click1").start(time);
        }
      } else {
        keys.player("click1").start(time);
      }
    }
  }
};

// Функция для подсчета шагов в последовательности
function countSteps(beats) {
  return beats.map((value, index) => index);
}

// Хук useTone для управления воспроизведением звуков
export default function useTone(config) {
  const [activeBeat, setActiveBeat] = useState(0); // Состояние активного бита
  const seqRef = useRef(null); // Ссылка на объект Tone.Sequence

  useEffect(() => {
    if (!config.isPlaying) {
      return; // Если метроном не запущен, выходим из useEffect
    }

    Tone.getTransport().bpm.value = config.tempo || 120; // Установка значения BPM

    const seq = new Tone.Sequence(
      (time, note) => {
        setActiveBeat(note);
        playNote(
          time,
          note,
          config.beatPattern,
          config.isBeatSound,
          config.isMetronomeSound,
          config.isDownbeatSound,
          config.isUpbeatSound,
          config.isAcsentbeatSound,
          config.noteSize || 4,
        );
        // Установка активного бита
      },
      countSteps(config.beatPattern.split("")),
      config.noteSize > 4 ? "4n" : "4n", //заглушка если что ускорить метроном.
    ).start(0);
    seqRef.current = seq; // Сохранение ссылки на новую последовательность

    return () => {
      // Очистка последовательности перед созданием новой
      seq.dispose();
    };
  }, [
    config.isPlaying,
    config.beatPattern,
    config.isBeatSound,
    config.isMetronomeSound,
    config.isDownbeatSound,
    config.isUpbeatSound,
    config.isAcsentbeatSound,
    config.noteSize,
    config.tempo,
  ]);

  // Старт/остановка воспроизведения
  useEffect(() => {
    if (config.isPlaying) {
      Tone.start();
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
    }
  }, [config.isPlaying]);

  return config.isPlaying ? [activeBeat] : [null];
}
