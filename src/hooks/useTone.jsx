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
const config = {
  g: {
    rootFifthSixth: [6, 4, 4],
    crossPickOrder: [NaN, NaN, 1, 2, 3, 4],
    crossPickPattern: [6, 4, 2, 1, 4, 3, 2, 1],
    stringVolumes: [-1, 0, 0, 0, 0, 0],
    bias: {
      low: [6, 6, 1, 2, 3, 4],
      mid: [6, 6, 3, 1, 2, 4],
      high: [6, 6, 4, 3, 2, 1],
      strum: [6, 6, 4, 1, 2, 3],
      bass: [1, 2, 2, 3, 5, 6],
      jazzD: [1, NaN, 2, 3, 4, 5],
      jazzU: [NaN, NaN, 3, 2, 1, 4],
      root: [1, 2, 2, 3, 5, 6],
      afterRoot: [6, 5, 1, 2, 3, 4],
      chuck1: [6, 6, 3, 1, 2, 4],
      afterChuck1: [6, 6, 4, 3, 1, 2],
      fifth: [4, 3, 1, 2, 5, 6],
      afterFifth: [6, 6, 2, 1, 3, 4],
      chuck2: [6, 6, 3, 2, 1, 4],
      afterChuck2: [6, 6, 4, 3, 2, 1],
      haye: [4, 4, 4, 4, 4, 4],
    },
  },
  d: {
    rootFifthSixth: [4, 5, 3],
    crossPickOrder: [NaN, 1, NaN, 2, 3, 4],
    crossPickPattern: [4, 3, 2, 1, 5, 3, 2, 1],
    stringVolumes: [-5, -3, 1, 0, 0, 0],
    bias: {
      low: [6, 3, 1, 2, 4, 5],
      mid: [6, 5, 3, 1, 2, 4],
      high: [6, 5, 4, 3, 2, 1],
      strum: [6, 5, 4, 2, 1, 3],
      bass: [4, 2, 1, 3, 5, 6],
      jazzD: [NaN, 5, 1, 2, 3, 4],
      jazzU: [NaN, 5, 4, 3, 2, 1],
      root: [5, 4, 1, 3, 5, 6],
      afterRoot: [6, 5, 3, 1, 2, 4],
      chuck1: [6, 5, 4, 2, 1, 3],
      afterChuck1: [6, 5, 4, 3, 2, 1],
      fifth: [6, 1, 2, 4, 5, 6],
      afterFifth: [6, 5, 2, 1, 3, 4],
      chuck2: [6, 5, 4, 2, 1, 3],
      afterChuck2: [6, 5, 4, 3, 2, 1],
      haye: [6, 5, 4, 4, 4, 4],
    },
  },
  a: {
    rootFifthSixth: [5, 4, 4],
    crossPickOrder: [NaN, NaN, 1, 2, 3, 4],
    crossPickPattern: [5, 4, 2, 1, 4, 3, 2, 1],
    stringVolumes: [-3, 0, 0, 0, 0, 0],
    bias: {
      low: [6, 3, 1, 2, 4, 5],
      mid: [6, 5, 3, 1, 2, 4],
      high: [6, 5, 4, 3, 2, 1],
      strum: [6, 5, 4, 1, 2, 3],
      bass: [5, 1, 2, 3, 4, 6],
      jazzD: [NaN, 1, 2, 3, 4, 5],
      jazzU: [NaN, 5, 4, 3, 1, 1],
      root: [4, 1, 2, 4, 5, 6],
      afterRoot: [6, 5, 1, 2, 3, 4],
      chuck1: [6, 6, 4, 2, 1, 3],
      afterChuck1: [6, 6, 4, 3, 2, 1],
      fifth: [5, 3, 1, 2, 4, 6],
      afterFifth: [6, 6, 3, 1, 2, 4],
      chuck2: [6, 6, 4, 2, 1, 3],
      afterChuck2: [6, 6, 4, 3, 2, 1],
      haye: [6, 5, 4, 4, 4, 4],
    },
  },
  c: {
    rootFifthSixth: [5, 6, 3],
    crossPickOrder: [1, NaN, 2, 3, 4, NaN],
    crossPickPattern: [5, 4, 3, 1, 6, 4, 2, 1],
    stringVolumes: [-3, 0, 0, 0, 0, 0],
    bias: {
      low: [6, 3, 1, 2, 4, 5],
      mid: [6, 5, 3, 1, 2, 4],
      high: [6, 5, 4, 3, 2, 1],
      strum: [6, 5, 4, 2, 1, 3],
      bass: [2, 1, 3, 4, 5, 6],
      jazzD: [NaN, 1, 2, 3, 4, 5],
      jazzU: [NaN, 4, 3, 2, 1, NaN],
      root: [2, 1, 3, 4, 5, 6],
      afterRoot: [6, 5, 1, 2, 3, 4],
      chuck1: [6, 6, 3, 1, 2, 4],
      afterChuck1: [6, 6, 4, 3, 2, 1],
      fifth: [1, 3, 4, 5, 6, 6],
      afterFifth: [6, 6, 1, 2, 3, 4],
      chuck2: [6, 6, 3, 1, 2, 4],
      afterChuck2: [6, 6, 4, 3, 2, 1],
      haye: [6, 4, 4, 4, 4, 4],
    },
  },
  e: {
    rootFifthSixth: [6, 5, 5],
    crossPickOrder: [NaN, 1, NaN, 2, 3, 4],
    crossPickPattern: [6, 4, 2, 1, 5, 3, 2, 1],
    stringVolumes: [0, 0, 0, 0, 0, 0],
    bias: {
      low: [6, 5, 1, 2, 3, 4],
      mid: [6, 5, 3, 1, 2, 4],
      high: [6, 5, 4, 3, 2, 1],
      strum: [6, 5, 1, 2, 3, 4],
      bass: [1, 2, 3, 4, 5, 6],
      jazzD: [1, 2, NaN, 3, 4, NaN],
      jazzU: [5, 4, 3, 2, 1, NaN],
      root: [1, 2, 3, 4, 5, 6],
      afterRoot: [5, 1, 2, 3, 4, 6],
      chuck1: [6, 6, 3, 1, 2, 4],
      afterChuck1: [6, 6, 4, 3, 1, 2],
      fifth: [3, 1, 2, 4, 5, 6],
      afterFifth: [6, 3, 2, 1, 4, 5],
      chuck2: [6, 6, 3, 2, 1, 4],
      afterChuck2: [6, 6, 4, 3, 2, 1],
      haye: [4, 4, 4, 4, 4, 4],
    },
  },
  aD: {
    rootFifthSixth: [5, 4, 4],
    crossPickOrder: [NaN, NaN, 1, 2, 3, 4],
    crossPickPattern: [5, 4, 3, 2, 5, 4, 3, 2],
    stringVolumes: [0, 0, 0, 0, 0, 0],
    bias: {
      low: [4, 3, 1, 2, 5, 6],
      mid: [6, 4, 3, 1, 2, 5],
      high: [6, 5, 4, 2, 1, 3],
      strum: [6, 5, 3, 2, 1, 4],
      bass: [6, 1, 2, 3, 4, 5],
      haye: [4, 4, 4, 4, 4, 4],
    },
    droning: !0,
  },
};
const samplesClick = {
  click1: new Tone.Player(click1).toDestination(),
  click2: new Tone.Player(click2).toDestination(),
};
const sampleFiles = import.meta.glob("../assets/samples/*.mp3", {
  query: "?url",
  eager: true,
});

export const gSamples = new Tone.ToneAudioBuffers();
const loadSample = async (sampleName) => {
  try {
    // Находим путь к файлу по имени
    const sampleEntry = Object.entries(sampleFiles).find(([path]) =>
      path.includes(sampleName),
    );

    if (!sampleEntry) {
      throw new Error(`Sample ${sampleName} not found in sampleFiles`);
    }

    const [, module] = sampleEntry;
    const samplePath = module.default; // Получаем путь к файлу

    // Загружаем буфер (замените на свою реализацию)

    gSamples.add(sampleName, samplePath); // Сохраняем в коллекцию
  } catch (error) {
    console.error(`Error loading sample ${sampleName}:`, error);
    throw error; // Пробрасываем ошибку
  }
};

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

  if (!gSamples.has(modifiedSample)) {
    console.log(`Sample ${modifiedSample} not loaded, loading now...`);
    loadSample(modifiedSample);
    return;
  }

  const player = stringPlayers[stringIndex];

  if (player.state === "started") {
    player.stop(time);
  }
  player.buffer = gSamples.get(modifiedSample);
  player.volume.value = db;
  player.start(time + offset, 0.05);
  console.log();
}
const ActionType = {
  down: {
    type: "play",
    spread: 4,
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
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  downH: {
    type: "play",
    spread: 3,
    bias: [4, 5, 6, 1, 2, 3],
    volumes: [-4, -3, 0, -3, -3, -5],
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
    volumes: [-4, -3, 0, -3, -3, -5],
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
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  upM: {
    type: "mute",
    spread: 6,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  downM: {
    type: "mute",
    spread: 6,
    bias: [1, 2, 3, 4, 5, 6],
    volumes: [-4, -3, 0, -3, -3, -5],
  },
  nothing: {
    type: "nothing",
    spread: 0,
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
  const samples = getSamples("C");

  return beatPattern.split("").map((beat, index) => {
    const getAction = soundMap[beat] || (() => "nothing");
    const action = getAction(index);

    const offsets = calculateStringOffsets(index % 2 === 0 ? "down" : "up");
    const actionData = ActionType[action] || {};
    const dbs = calculateStringVolumes(actionData);
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
