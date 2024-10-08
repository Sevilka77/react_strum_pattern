import { useEffect, useRef, useState } from "react";

import * as Tone from "tone";
import up from "./up.wav";
import down from "./down.wav";
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
    upA: up,
    downA: down,
    upM: upM,
    downM: downM,
    x: x,
    click1: click1,
    click2: click2,
  },
  onload: () => console.log("loaded"), // Обработчик загрузки
}).toDestination(); // Отправка звуков на выход аудио
keys.player("upA").volume.value = 1;
keys.player("downA").volume.value = 1;

function playNote(note, time, duration, isBeatSound) {
  // Проверяем, воспроизводится ли звук для бита
  if (isBeatSound && note !== "nothing") {
    keys.player(note).start(time, 0, duration);
  }
}
// Функция для воспроизведения ноты
const playMetronome = (
  time,
  index,
  isMetronomeSound,
  isDownbeatSound,
  isUpbeatSound,
  isAcsentbeatSound,
  noteSize,
) => {
  // Проверка наличия метронома и его воспроизведение isDownbeatSound
  if (isMetronomeSound) {
    if (index % noteSize === 0 && isAcsentbeatSound) {
      keys.player("click2").start(time);
    } else {
      if (noteSize > 5) {
        if (index % 2 != 0 && isUpbeatSound) {
          keys.player("click1").start(time);
        }
        if (index % 2 == 0 && isDownbeatSound) {
          keys.player("click1").start(time);
        }
      } else {
        keys.player("click1").start(time);
      }
    }
  }
};

// Функция для подсчета шагов в последовательности
function countSteps(beatPattern) {
  return beatPattern.split("").map((beat, index) => {
    let sound = "nothing"; // Инициализация переменных для звука

    switch (beat) {
      case "0": // Пауза
        sound = "nothing";
        break;
      case "1": // Обычные удары "down" и "up"
        sound = index % 2 === 0 ? "down" : "up";
        break;
      case "A": // Акцентированные удары "downA" и "upA"
        sound = index % 2 === 0 ? "downA" : "upA";
        break;
      case "x": // Специальный звук "x"
        sound = "x";
        break;
      case "c": // Удары с приглушением "downM" и "upM"
        sound = index % 2 === 0 ? "downM" : "upM";
        break;
      default:
        sound = "nothing"; // Если бит не распознан, ничего не играем
        break;
    }

    return sound; // Возвращаем звук и его длительность для каждого шага
  });
}
function calcDurations(soundArray) {
  const durations = new Array(soundArray.length); // Создаем массив для длительностей
  let currentDuration = { "4n": 1 }; // Начальная длительность

  // Обходим массив с конца
  for (let i = soundArray.length - 1; i >= 0; i--) {
    if (soundArray[i] !== "nothing") {
      // Если звук не "nothing", присваиваем текущую длительность
      durations[i] = currentDuration;
      currentDuration = { "4n": 1 }; // Сбрасываем длительность для следующего элемента
    } else {
      // Если звук "nothing"
      durations[i] = { "4n": 1 }; // Присваиваем текущую длительность
      // Увеличиваем длительность для следующего элемента
      currentDuration = increaseDuration(currentDuration);
    }
  }

  return durations; // Разворачиваем массив перед возвратом
}

// Функция для увеличения длительности
function increaseDuration(duration) {
  if (duration["4n"] === 1) {
    return { "4n": 2 };
  } else if (duration["4n"] === 2) {
    return { "4n": 3 };
  } else if (duration["4n"] === 3) {
    return { "4n": 4 };
  } else {
    return { "4n": duration["4n"] + 1 };
  }
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
    const steps = countSteps(config.beatPattern);
    const durations = calcDurations(steps);

    const seq = new Tone.Sequence(
      (time, index) => {
        console.log(index, steps[index], durations[index]);
        const sound = steps[index];
        setActiveBeat(index);
        playNote(sound, time, durations[index], config.isBeatSound);
        playMetronome(
          time,
          index,
          config.isMetronomeSound,
          config.isDownbeatSound,
          config.isUpbeatSound,
          config.isAcsentbeatSound,
          config.noteSize,
        );
      },
      Array.from({ length: steps.length }, (_, i) => i),
      "4n", //заглушка если что ускорить метроном.
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

  return config.isPlaying ? activeBeat : null;
}
