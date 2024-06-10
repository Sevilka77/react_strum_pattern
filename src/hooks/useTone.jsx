import { useEffect, useRef, useState } from "react";

import * as Tone from "tone";
import up from "./up.wav";
import down from "./down.wav";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

// Создание Tone.Players для воспроизведения звуков
const keys = new Tone.Players({
  urls: { up: up, down: down, click1: click1, click2: click2 },
  onload: () => console.log("loaded"), // Обработчик загрузки
}).toDestination(); // Отправка звуков на выход аудио

// Функция для воспроизведения ноты
const playNote = (
  time,
  note,
  beatPattern,
  isBeatSound,
  isMetronomeSound,
  noteSize,
) => {
  // Проверка наличия звука для бита и его воспроизведение
  if (isBeatSound && beatPattern[note] !== "0") {
    if (note % 2 === 0) {
      keys.player("down").start(time);
    } else {
      keys.player("up").start(time);
    }
  }
  // Проверка наличия метронома и его воспроизведение
  if (isMetronomeSound) {
    if (note % noteSize === 0) {
      keys.player("click2").start(time);
    } else {
      keys.player("click1").start(time);
    }
  }
};

// Создание Tone.Sequence для управления последовательностью звуков
const seq = new Tone.Sequence(playNote, [], "4n").start(0);

// Функция для подсчета шагов в последовательности
function countSteps(beats) {
  return beats.map((value, index) => index);
}

// Хук useTone для управления воспроизведением звуков
export default function useTone(config, beatPattern) {
  const [activeBeat, setActiveBeat] = useState(0); // Состояние активного бита
  Tone.getTransport().bpm.value = config.tempo || 120; // Установка значения BPM

  const seqRef = useRef(seq); // Ссылка на объект Tone.Sequence

  useEffect(() => {
    if (!config.isPlaying) {
      return; // Если метроном не запущен, выходим из useEffect
    }

    // Установка колбэка для последовательности
    seqRef.current.callback = (time, note) => {
      playNote(
        time,
        note,
        beatPattern,
        config.isBeatSound,
        config.isMetronomeSound,
        config.noteSize || 4,
      );
      setActiveBeat(note); // Установка активного бита
    };

    seqRef.current.events = countSteps(beatPattern); // Установка шагов последовательности
  }, [
    config.isPlaying,
    beatPattern,
    config.isBeatSound,
    config.isMetronomeSound,
    config.noteSize,
  ]);

  // Возвращаем activeBeat только если метроном запущен
  return config.isPlaying ? [activeBeat] : [null];
}
