import { useEffect, useRef, useState } from "react";

import * as Tone from "tone";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

const chords = [
  ["320003", "G", "g"],
  ["002220", "A", "a"],
  ["332010", "C", "c"],
  ["200232", "D", "d"],
  ["022100", "E", "e"],
  ["133211", "F", "e"],
  ["133111", "Fm", "e"],
  ["002210", "Am", "a"],
  ["_00231", "Dm", "d"],
  ["022000", "Em", "e"],
  ["224432", "Bm", "aD"],
];
const samplesClick = {
  click1: new Tone.Player(click1).toDestination(),
  click2: new Tone.Player(click2).toDestination(),
};
const sampleFiles = import.meta.glob("../assets/samples/*.mp3", {
  query: "?url",
  eager: true,
});

export const gSamples = new Tone.ToneAudioBuffers();

const loadSample = (name, path) => {
  return new Promise((resolve, reject) => {
    console.log(`Loading file: ${name} from ${path}`);

    gSamples.add(
      name,
      path,
      () => {
        console.log(`${name} loaded successfully`);
        resolve();
      },
      (e) => {
        console.log(`Error loading ${name}`, e);
        reject(e);
      },
    );
  });
};

// Функция для загрузки всех сэмплов последовательно
const loadAllSamplesSequentially = async () => {
  const urls = Object.entries(sampleFiles).map(([path, module]) => {
    const fileName = path.replace("../assets/samples/", "").replace(".mp3", "");
    const filePath = module.default; // Получаем URL файла
    console.log(`Preparing to load: ${fileName} from ${filePath}`);
    return [fileName, filePath];
  });

  // Загрузка каждого сэмпла по очереди
  for (const [name, path] of urls) {
    try {
      await loadSample(name, path); // Ждем завершения загрузки каждого файла
      console.log(`${name} loaded successfully`);
    } catch (error) {
      console.error(`Error loading ${name}`, error);
    }
  }

  console.log("All samples loaded sequentially");
};

// Запуск загрузки всех сэмплов
loadAllSamplesSequentially();

const channels = Array.from({ length: 6 }, () =>
  new Tone.Channel().toDestination(),
);

const stringPlayers = Array.from({ length: 6 }, (_, i) =>
  new Tone.Player().connect(channels[i]),
);

function playStringSound(sample, type, stringIndex, time, db, offset) {
  const modifiedSample =
    type === "play"
      ? sample.concat("Z")
      : type === "mute"
        ? sample.replace(/[^o]/g, "F").concat("Z")
        : type === "chop"
          ? sample.concat("C")
          : sample;

  const player = stringPlayers[stringIndex];
  if (player.state === "started") {
    player.stop(time);
  }
  player.buffer = gSamples.get(modifiedSample);
  player.volume.value = db;
  player.start(time + offset, 0.05);
}
const ActionType = {
  down: {
    type: "play",
    spread: 5,
    bias: [6, 5, 1, 2, 3, 4],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  downA: {
    type: "play",
    spread: 6,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  downB: {
    type: "play",
    spread: 2,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-2, -1, 0, -3, -3, -5],
  },
  downH: {
    type: "play",
    spread: 3,
    bias: [4, 5, 6, 1, 2, 3],
    volumes: [-4, -3, 0, -1, -1, -3],
  },
  up: {
    type: "play",
    spread: 4,
    bias: [6, 5, 1, 2, 3, 4],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  upA: {
    type: "play",
    spread: 6,
    bias: [6, 5, 4, 3, 2, 1],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  upB: {
    type: "play",
    spread: 2,
    bias: [2, 1, 3, 4, 5, 6],
    volumes: [-2, -1, 0, -3, -3, -5],
  },
  upH: {
    type: "play",
    spread: 3,
    bias: [4, 5, 6, 3, 2, 1],
    volumes: [-4, -3, 0, -1, -1, -3],
  },
  x: {
    type: "chop",
    spread: 6,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-10, -10, -10, -8, -5, -4],
  },
  upM: {
    type: "mute",
    spread: 4,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  downM: {
    type: "mute",
    spread: 4,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  nothing: {
    type: "nothing",
    spread: 6,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
};
function calculateStringVolumes(actionData) {
  const { spread, bias, volumes } = actionData;
  return volumes.map((val, t) => {
    // Если значение val является числом и bias[t] больше spread, возвращаем NaN, иначе возвращаем val
    return !isNaN(val) && bias[t] > spread ? NaN : val;
  });
}
function calculateStringOffsets(direction) {
  const m = 0.003; // Задержка между строками
  const offsetResults = [];
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

// Функция getSamples с встроенной функцией l
function getSamples(chordName) {
  // Ищем аккорд в массиве chords по имени
  const chordData = chords.find((chord) => chord[1] === chordName);

  if (!chordData) {
    console.log(`Аккорд ${chordName} не найден!`);
    return [];
  }
  // Получаем строку аккорда
  const chord = chordData[0];

  // функция получене имени sampla
  const sampleName = (e, t) => {
    return ""
      .concat("o".repeat(6 - e))
      .concat(t)
      .concat("o".repeat(e - 1));
  };

  return chord.split("").map((currentChar, r) => {
    if (currentChar === "_") {
      currentChar = "F"; // Заменяем "_" на "F"
    }
    return sampleName(6 - r, currentChar);
  });
}

function playInstruction(instructions, time, isBeatSound) {
  instructions.forEach((instruction, index) => {
    const { type, sample, db, offset } = instruction;

    // Убедимся, что это не "nothing", и что db - валидное число
    if (isBeatSound && type !== "nothing" && !isNaN(db)) {
      playStringSound(sample, type, index, time, db, offset);
    }
  });
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
      samplesClick["click2"].start(time); // Звук для такта
    } else {
      if (noteDuration === "4n") {
        samplesClick["click1"].start(time);
      } else if (noteDuration === "8n") {
        if (index % 2 === 0) {
          if (clickMainBeat) {
            samplesClick["click1"].start(time);
          }
        } else {
          if (clickSubbeat) {
            samplesClick["click1"].start(time);
          }
        }
      } else if (noteDuration === "16n") {
        if (index % 4 === 0) {
          if (clickMainBeat) {
            samplesClick["click1"].start(time);
          }
        } else {
          if (clickSubbeat) {
            samplesClick["click1"].start(time);
          }
        }
      } // Звук для бита
    }
  }
};

function countSteps(beatPattern) {
  const soundMap = {
    0: () => "nothing", // Пауза
    1: (index) => (index % 2 === 0 ? "down" : "up"),
    A: (index) => (index % 2 === 0 ? "downA" : "upA"),
    x: () => "x", // Специальный звук "x"
    c: (index) => (index % 2 === 0 ? "downM" : "upM"),
    h: (index) => (index % 2 === 0 ? "downH" : "upH"),
    b: (index) => (index % 2 === 0 ? "downB" : "upB"),
  };
  const samples = getSamples("Fm");

  return beatPattern.split("").map((beat, index) => {
    const getAction = soundMap[beat] || (() => "nothing");
    const action = getAction(index);

    const offsets = calculateStringOffsets(index % 2 === 0 ? "down" : "up");
    const actionData = ActionType[action] || {};
    const dbs = calculateStringVolumes(actionData);

    console.log(samples);
    const instructions = samples.map((sample, sampleIndex) => ({
      type: actionData.type,
      sample,
      db: dbs[sampleIndex],
      offset: offsets[sampleIndex],
    }));
    return { index, instructions };
  });
}

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
    console.log(steps);
    // const durations = calcDurations(steps, config.noteDuration);

    const seq = new Tone.Sequence(
      (time, index) => {
        const sound = steps[index].instructions;
        Tone.getDraw().schedule(() => {
          setActiveBeat(index);
        }, time);
        playInstruction(sound, time, config.isBeatSound);

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
    seqRef.current = seq;

    return () => {
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
