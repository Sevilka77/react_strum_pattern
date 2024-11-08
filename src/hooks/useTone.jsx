import { useEffect, useRef, useState } from "react";

import * as Tone from "tone";

import click1 from "./click1.wav";
import click2 from "./click2.wav";
import g1 from "./g1.mp3";
import g2 from "./g2.mp3";
import g3 from "./g3.mp3";
import g4 from "./g4.mp3";
import g5 from "./g5.mp3";
import g6 from "./g6.mp3";
import g1L from "./g1L.mp3";
import g2L from "./g2L.mp3";
import g3L from "./g3L.mp3";
import g4L from "./g4L.mp3";
import g5L from "./g5L.mp3";
import g6L from "./g6L.mp3";
import g1C from "./g1C.mp3";
import g2C from "./g2C.mp3";
import g3C from "./g3C.mp3";
import g4C from "./g4C.mp3";
import g5C from "./g5C.mp3";
import g6C from "./g6C.mp3";

const samples = {
  g1: new Tone.Player(g1).toDestination(),
  g2: new Tone.Player(g2).toDestination(),
  g3: new Tone.Player(g3).toDestination(),
  g4: new Tone.Player(g4).toDestination(),
  g5: new Tone.Player(g5).toDestination(),
  g6: new Tone.Player(g6).toDestination(),
  g1L: new Tone.Player(g1L).toDestination(),
  g2L: new Tone.Player(g2L).toDestination(),
  g3L: new Tone.Player(g3L).toDestination(),
  g4L: new Tone.Player(g4L).toDestination(),
  g5L: new Tone.Player(g5L).toDestination(),
  g6L: new Tone.Player(g6L).toDestination(),
  g1C: new Tone.Player(g1C).toDestination(),
  g2C: new Tone.Player(g2C).toDestination(),
  g3C: new Tone.Player(g3C).toDestination(),
  g4C: new Tone.Player(g4C).toDestination(),
  g5C: new Tone.Player(g5C).toDestination(),
  g6C: new Tone.Player(g6C).toDestination(),
  click1: new Tone.Player(click1).toDestination(),
  click2: new Tone.Player(click2).toDestination(),
};

const dataset = {
  down: {
    samples: ["g6", "g5", "g4", "g3", "g2", "g1"],
    spread: 4,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [0.8, 0.75, 0.7, 0.65, 0.6, 0.5],
  },
  downA: {
    samples: ["g6", "g5", "g4", "g3", "g2", "g1"],
    spread: 6,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [0.8, 0.75, 0.7, 0.65, 0.6, 0.5],
  },
  up: {
    samples: ["g6", "g5", "g4", "g3", "g2", "g1"],
    spread: 4,
    bias: [4, 3, 2, 1, 5, 6],
    volumes: [0.5, 0.6, 0.65, 0.07, 0.75, 0.8],
  },
  upA: {
    samples: ["g6", "g5", "g4", "g3", "g2", "g1"],
    spread: 6,
    bias: [6, 5, 4, 3, 2, 1],
    volumes: [0.5, 0.6, 0.65, 0.07, 0.75, 0.8],
  },
  x: {
    samples: ["g6C", "g5C", "g4C", "g3C", "g2C", "g1C"],
    spread: 6,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-10, -10, -10, -8, -5, -4],
  },
  upM: {
    samples: ["g6L", "g5L", "g4L", "g3L", "g2L", "g1L"],
    spread: 4,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [0.5, 0.6, 0.65, 0.07, 0.75, 0.8],
  },
  downM: {
    samples: ["g6L", "g5L", "g4L", "g3L", "g2L", "g1L"],
    spread: 4,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [0.8, 0.75, 0.7, 0.65, 0.6, 0.5],
  },
};
function calculateStringVolumes(s, h, v) {
  const i = v;

  for (let t = 0; t < 6; t++) {
    if (!isNaN(i[t])) {
      // Проверяем, больше ли h максимального spread
      if (h[t] > s) {
        i[t] = NaN;
      }
    }
  }
  // console.log(i);
  return i;
}

function calculateStringOffsets(direction) {
  const m = 0.002; // Задержка между строками
  const offsetResults = {};
  const maxStringIndex = 5; // Максимальный индекс строки

  // Устанавливаем начальные параметры
  const startIndex = direction === "up" ? maxStringIndex : 0;
  const endIndex = direction === "up" ? 0 : maxStringIndex;
  const step = direction === "up" ? -1 : 1;

  // Цикл для подсчета смещений
  for (
    let t = 0, r = startIndex;
    direction === "up" ? r >= endIndex : r <= endIndex;
    r += step, t++
  ) {
    let offset = t * m;

    // Дополнительное смещение для первой строки при движении вниз
    if (direction === "down" && r === 0 && t > 0) {
      offset += Math.min(m, 0.01);
    }

    // Добавляем случайное смещение
    offset += 0.001 * Math.random();

    // Сохраняем результат в объект
    offsetResults[r] = offset;
  }
  return offsetResults;
}

function playNote(note, time, isBeatSound) {
  if (isBeatSound) {
    let noteData, direction, offsets, dbs;

    switch (note) {
      case "nothing":
        return;
      case "up":
      case "upA":
      case "upM":
        noteData = dataset[note];
        direction = "up";
        break;
      case "down":
      case "downA":
      case "downM":
      case "x":
        noteData = dataset[note];
        direction = "down";
        break;
      default:
        console.log("Note not found in dataset or unsupported note type.");
        return; // Выходим из функции, если note не соответствует ожидаемым значениям
    }
    offsets = calculateStringOffsets(direction);
    dbs = calculateStringVolumes(
      noteData.spread,
      noteData.bias,
      noteData.volumes,
    );
    noteData.samples.forEach((item, index) => {
      const offset = offsets[index];
      const db = dbs[index];

      if (!isNaN(db)) {
        if (samples[item]) {
          samples[item].fadeOut = 0.2;
          if (samples[item].state === "started") {
            samples[item].stop();
          }
          if (item.endsWith("L") || item.endsWith("C")) {
            const baseSampleName = item.slice(0, -1);
            if (samples[baseSampleName].state === "started") {
              samples[baseSampleName].stop();
            }
          }

          samples[item].volume.value = db - 2;
          samples[item].start(time + offset, 0.05);
        }
      } else {
        // Громкость струны равна NaN, звук не воспроизводится
      }
    });
  }
}

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
      samples["click2"].start(time); // Звук для такта
    } else {
      if (noteDuration === "4n") {
        samples["click1"].start(time);
      } else if (noteDuration === "8n") {
        if (index % 2 === 0) {
          if (clickMainBeat) {
            samples["click1"].start(time);
          }
        } else {
          if (clickSubbeat) {
            samples["click1"].start(time);
          }
        }
      } else if (noteDuration === "16n") {
        if (index % 4 === 0) {
          if (clickMainBeat) {
            samples["click1"].start(time);
          }
        } else {
          if (clickSubbeat) {
            samples["click1"].start(time);
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
// function calcDurations(soundArray, noteDuration) {
//   const durations = new Array(soundArray.length); // Создаем массив для длительностей
//   let currentDuration = { [noteDuration]: 1 };
//   // Начальная длительность

//   // Обходим массив с конца
//   for (let i = soundArray.length - 1; i >= 0; i--) {
//     if (soundArray[i] !== "nothing") {
//       // Если звук не "nothing", присваиваем текущую длительность
//       durations[i] = currentDuration;
//       currentDuration = { [noteDuration]: 1 }; // Сбрасываем длительность для следующего элемента
//     } else {
//       // Если звук "nothing"
//       durations[i] = { [noteDuration]: 1 }; // Присваиваем текущую длительность
//       // Увеличиваем длительность для следующего элемента
//       currentDuration = increaseDuration(currentDuration, [noteDuration]);
//     }
//   }

//   return durations; // Разворачиваем массив перед возвратом
// }

// Функция для увеличения длительности
// function increaseDuration(duration, noteDuration) {
//   if (duration[noteDuration] === 1) {
//     return { [noteDuration]: 2 };
//   } else if (duration[noteDuration] === 2) {
//     return { [noteDuration]: 3 };
//   } else if (duration[noteDuration] === 3) {
//     return { [noteDuration]: 4 };
//   } else {
//     return { [noteDuration]: duration[noteDuration] + 1 };
//   }
// }

// Хук useTone для управления воспроизведением звуков
export default function useTone(config) {
  const [activeBeat, setActiveBeat] = useState(0); // Состояние активного бита
  const seqRef = useRef(null); // Ссылка на объект Tone.Sequence

  useEffect(() => {
    if (!config.isPlaying) {
      return; // Если метроном не запущен, выходим из useEffect
    }

    Tone.getTransport().bpm.value = config.tempo || 120;

    const steps = countSteps(config.beatPattern);
    // const durations = calcDurations(steps, config.noteDuration);

    const seq = new Tone.Sequence(
      (time, index) => {
        const sound = steps[index];
        setActiveBeat(index);
        // playNote(sound, time, durations[index], config.isBeatSound);
        playNote(sound, time, config.isBeatSound);

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
      config.noteDuration || "8n",
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
