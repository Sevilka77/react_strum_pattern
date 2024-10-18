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
  clickMainBeat,
  clickSubbeat,
  clickTaktBeat,
  noteDuration,
) => {
  if (isMetronomeSound) {
    if (clickTaktBeat && index === 0) {
      keys.player("click2").start(time); // Звук для такта
    } else {
      if (noteDuration === "4n") {
        keys.player("click1").start(time);
      } else if (noteDuration === "8n") {
        if (index % 2 === 0) {
          if (clickMainBeat) {
            keys.player("click1").start(time);
          }
        } else {
          if (clickSubbeat) {
            keys.player("click1").start(time);
          }
        }
      } else if (noteDuration === "16n") {
        if (index % 4 === 0) {
          if (clickMainBeat) {
            keys.player("click1").start(time);
          }
        } else {
          if (clickSubbeat) {
            keys.player("click1").start(time);
          }
        }
      } // Звук для бита
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
function calcDurations(soundArray, noteDuration) {
  const durations = new Array(soundArray.length); // Создаем массив для длительностей
  let currentDuration = { [noteDuration]: 1 };
  console.log(currentDuration); // Начальная длительность

  // Обходим массив с конца
  for (let i = soundArray.length - 1; i >= 0; i--) {
    if (soundArray[i] !== "nothing") {
      // Если звук не "nothing", присваиваем текущую длительность
      durations[i] = currentDuration;
      currentDuration = { [noteDuration]: 1 }; // Сбрасываем длительность для следующего элемента
    } else {
      // Если звук "nothing"
      durations[i] = { [noteDuration]: 1 }; // Присваиваем текущую длительность
      // Увеличиваем длительность для следующего элемента
      currentDuration = increaseDuration(currentDuration, [noteDuration]);
    }
  }

  return durations; // Разворачиваем массив перед возвратом
}

// Функция для увеличения длительности
function increaseDuration(duration, noteDuration) {
  if (duration[noteDuration] === 1) {
    return { [noteDuration]: 2 };
  } else if (duration[noteDuration] === 2) {
    return { [noteDuration]: 3 };
  } else if (duration[noteDuration] === 3) {
    return { [noteDuration]: 4 };
  } else {
    return { [noteDuration]: duration[noteDuration] + 1 };
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
    const durations = calcDurations(steps, config.noteDuration);
    console.log(durations);

    const seq = new Tone.Sequence(
      (time, index) => {
        const sound = steps[index];
        setActiveBeat(index);
        playNote(sound, time, durations[index], config.isBeatSound);
        playMetronome(
          time,
          index,
          config.isMetronomeSound,
          config.clickMainBeat,
          config.clickSubbeat,
          config.clickTaktBeat,
          config.noteDuration,
        );
      },
      Array.from({ length: steps.length }, (_, i) => i),
      config.noteDuration || "8n", //заглушка если что ускорить метроном.
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
    config.tempo,
    config.noteDuration,
    config.clickMainBeat,
    config.clickSubbeat,
    config.clickTaktBeat,
  ]);

  // Старт/остановка воспроизведения
  useEffect(() => {
    if (config.isPlaying) {
      Tone.start().then(() => {
        Tone.getTransport().start();
      });
    } else {
      Tone.getTransport().stop();
    }
  }, [config.isPlaying]);

  return config.isPlaying ? activeBeat : null;
}
