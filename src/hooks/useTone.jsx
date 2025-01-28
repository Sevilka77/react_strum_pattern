import { useEffect, useRef } from "react";
import { useCycle } from "../hooks/useCycle";
import * as Tone from "tone";
import click1 from "../assets/samples/click1.wav";
import click2 from "../assets/samples/click2.wav";
import hit from "../assets/samples/hit.mp3";
import hit2 from "../assets/samples/hit2.mp3";
import hihat from "..//assets/samples/hihat.mp3";
import { useConfig } from "./useConfig";

const sampleFiles = import.meta.glob("../assets/samples/*.mp3", {
  query: "?url",
  eager: true,
});

const masterChannel = new Tone.Channel().toDestination();

const compressor = new Tone.Compressor({
  threshold: -4, // Работает только на тихих звуках
  ratio: 6, // Умеренная компрессия
  attack: 0.05, // Быстрое срабатывание
  release: 0.15,
  knee: 8,
}).connect(masterChannel);

export const channels = {
  master: masterChannel,
  clickChannel: new Tone.Channel().connect(masterChannel),
  hitChannel: new Tone.Channel().connect(masterChannel),
  guitarChannel: new Tone.Channel().connect(compressor),
};

const numberOfStrings = 6;
// Создаем каналы для каждой струны и подключаем их к основному каналу
const stringChannels = Array.from({ length: numberOfStrings }, () =>
  new Tone.Channel().connect(channels.guitarChannel),
);
const samplesHit = {
  hit: new Tone.Player(hit).connect(channels.hitChannel),
  hit2: new Tone.Player(hit2).connect(channels.hitChannel),
  hihat: new Tone.Player(hihat).connect(channels.hitChannel),
};
const samplesClick = {
  click1: new Tone.Player(click1).connect(channels.clickChannel),
  click2: new Tone.Player(click2).connect(channels.clickChannel),
};
const players = {};
const active = {};

const chordsWithConfig = {
  G: {
    frets: "320003",

    config: {
      stringVolumes: [-1, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [1, 2, 3, 4, 5, 6],
        mid: [6, 6, 3, 1, 2, 4],
        high: [6, 6, 4, 3, 2, 1],
        strum: [6, 6, 4, 1, 2, 3],
        strumD: [1, 2, 3, 4, 5, 6],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  A: {
    frets: "_02220",

    config: {
      stringVolumes: [-6, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [6, 1, 2, 3, 4, 5],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 5, 4, 1, 2, 3],
        strumD: [6, 1, 2, 3, 4, 5],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  C: {
    frets: "332010",

    config: {
      stringVolumes: [-6, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [1, 2, 3, 4, 5, 6],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 5, 4, 2, 1, 3],
        strumD: [6, 1, 2, 3, 4, 5],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  D: {
    frets: "__0232",

    config: {
      stringVolumes: [-5, -3, 1, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [6, 3, 1, 2, 4, 5],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 5, 4, 2, 1, 3],
        strumD: [6, 5, 1, 2, 3, 5],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  E: {
    frets: "022100",

    config: {
      stringVolumes: [0, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [1, 2, 3, 4, 5, 6],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 4, 1, 2, 3, 5],
        strumD: [1, 2, 3, 4, 5, 6],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  F: {
    frets: "133211",
    config: {
      stringVolumes: [0, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [1, 2, 3, 4, 5, 6],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 4, 1, 2, 3, 5],
        bass: [1, 2, 3, 4, 5, 6],
        strumD: [1, 2, 3, 4, 5, 6],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  Fm: {
    frets: "133111",
    config: {
      stringVolumes: [0, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [1, 2, 3, 4, 5, 6],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 4, 1, 2, 3, 5],
        strumD: [1, 2, 3, 4, 5, 6],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  Am: {
    frets: "_02210",

    config: {
      stringVolumes: [-3, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [6, 1, 2, 3, 4, 5],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 4, 1, 2, 3, 5],
        strumD: [6, 1, 2, 3, 4, 5],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  Dm: {
    frets: "__0231",

    config: {
      stringVolumes: [-5, -3, 1, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [6, 3, 1, 2, 4, 5],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 4, 1, 2, 3, 5],
        strumD: [6, 5, 1, 2, 3, 5],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  Em: {
    frets: "022000",

    config: {
      stringVolumes: [0, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [1, 2, 3, 4, 5, 6],
        mid: [6, 5, 3, 1, 2, 4],
        high: [6, 5, 4, 3, 2, 1],
        strum: [6, 4, 1, 2, 3, 5],
        strumD: [1, 2, 3, 4, 5, 6],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
  Bm: {
    frets: "224432",

    config: {
      stringVolumes: [0, 0, 0, 0, 0, 0],
      bias: {
        no: [NaN, NaN, NaN, NaN, NaN, NaN],
        low: [1, 2, 3, 4, 5, 6],
        mid: [6, 4, 3, 1, 2, 5],
        high: [6, 5, 4, 2, 1, 3],
        strum: [6, 4, 1, 2, 3, 5],
        strumD: [1, 2, 3, 4, 5, 6],
        strumU: [6, 5, 4, 3, 2, 1],
      },
    },
  },
};
const actionType = {
  down: {
    type: "play",
    spread: 3.7,
    bias: "strumD",
  },
  downA: {
    type: "play",
    spread: 6,
    bias: "strumD",
    accent: true,
  },
  downB: {
    type: "play",
    spread: 2,
    bias: "low",
  },
  downH: {
    type: "play",
    spread: 3,
    bias: "high",
  },
  up: {
    type: "play",
    spread: 3.7,
    bias: "strumU",
  },
  upA: {
    type: "play",
    spread: 6,
    bias: "strum",
    accent: true,
  },
  upB: {
    type: "play",
    spread: 2,
    bias: "low",
  },
  upH: {
    type: "play",
    spread: 3,
    bias: "high",
  },
  x: {
    type: "chop",
    spread: 6,
    bias: "low",
  },
  upM: {
    type: "mute",
    spread: 6,
    bias: "low",
  },
  downM: {
    type: "mute",
    spread: 6,
    bias: "low",
  },
  nothing: {
    type: "nothing",
    spread: 0,
    bias: "no",
  },
};
function generateSampleName(stringIndex, note) {
  return ""
    .concat("o".repeat(6 - stringIndex))
    .concat(note)
    .concat("o".repeat(stringIndex - 1));
}

function getSampleVariations(sampleName) {
  const variations = ["play", "mute", "chop"];
  const variationSamples = [];

  variations.forEach((type) => {
    let modifiedSample;
    switch (type) {
      case "play":
        modifiedSample = sampleName + "Z"; // Пример для play
        break;
      case "mute":
        modifiedSample = sampleName.replace(/[^o]/g, "F") + "Z"; // Пример для mute
        break;
      case "chop":
        modifiedSample = sampleName + "C"; // Пример для chop
        break;
      default:
        modifiedSample = sampleName;
    }

    variationSamples.push(modifiedSample);
  });

  return variationSamples;
}

const loadChord = async (chordName) => {
  const chordData = chordsWithConfig[chordName];

  if (!chordData) {
    //console.debug(`Аккорд ${chordName} не найден!`);
    return [];
  }

  // Получаем строку аккорда
  const { frets } = chordData;

  // Пробегаем по каждой струне аккорда
  const promises = frets.split("").map(async (note, stringIndex) => {
    if (note === "_") {
      note = "F"; // Заменяем "_" на "F"
    }

    const sampleName = generateSampleName(6 - stringIndex, note);
    const variations = getSampleVariations(sampleName);

    const variationPromises = variations.map(async (sample) => {
      try {
        const sampleEntry = Object.entries(sampleFiles).find(([path]) =>
          path.includes(sample),
        );
        if (!sampleEntry) {
          console.warn(`Sample ${sample} not found in sampleFiles`);
          return;
        }
        const [, module] = sampleEntry;
        const samplePath = module.default;

        players[sample] = new Tone.Player(samplePath).connect(
          stringChannels[5 - stringIndex],
        );
        players[sample].stringId = 5 - stringIndex;
        //console.debug(
        //   `Sample ${sample} loaded and connected to string ${6 - stringIndex}`,
        // );
      } catch (error) {
        console.error(`Error loading sample ${sample}:`, error);
        return null;
      }
    });
    await Promise.all(variationPromises);
  });

  await Promise.all(promises);
  //console.debug("Chord loaded successfully:", players);
};
const loadAllChords = async () => {
  // Проходим по всем аккордам
  try {
    await Promise.all(
      Object.keys(chordsWithConfig).map(async (chordName) => {
        //console.debug(`Загружаем аккорд: ${chordName}`);
        await loadChord(chordName); // Загружаем аккорд по имени
        //console.debug(`Аккорд ${chordName} успешно загружен!`);
      }),
    );
    console.debug("Все аккорды успешно загружены!");
  } catch (error) {
    console.error("Ошибка при загрузке аккордов:", error);
  }
};

loadAllChords();

function playStringSound(sample, type, time, db, offset) {
  let modifiedSample;

  switch (type) {
    case "play":
      modifiedSample = sample.concat("Z");
      break;
    case "mute":
      modifiedSample = sample.replace(/[^o]/g, "F").concat("Z");
      break;
    case "chop":
      modifiedSample = sample.concat("C");
      break;
    default:
      modifiedSample = sample;
  }
  if (!players[modifiedSample]) {
    //console.debug(`Player ${modifiedSample} not loaded`);
    return;
  }

  if (active[players[modifiedSample].stringId]) {
    let sample = active[players[modifiedSample].stringId]; // Получаем значение сэмпла для данного ключа
    // Останавливаем сэмпл (например, при помощи triggerRelease)
    if (players[sample]) {
      players[sample].fadeOut = 0.05;
      players[sample].stop(time);
      active[players[modifiedSample].stringId] = "";
    }
  }

  players[modifiedSample].volume.value =
    type == "chop" ? db - 7 : type == "mute" ? db + 5 : db;

  active[players[modifiedSample].stringId] = modifiedSample;

  players[modifiedSample].start(time + offset, 0.03);
}

function calculateBaseStringVolumes(chordName, actionData) {
  const chord = chordsWithConfig[chordName];
  if (!chord) {
    console.warn(`Аккорд ${chordName} не найден!`);
    return [];
  }
  const { spread, bias } = actionData;

  const chordBias = chord.config.bias[bias];
  const volumes = chord.config.stringVolumes.slice();
  let spreadPlusRandom = spread + Math.random();

  for (let t = 0; t < 6; t++) {
    if (!isNaN(volumes[t])) {
      // Если значение chordBias[t] не задано, то сразу ставим NaN
      if (isNaN(chordBias[t])) {
        volumes[t] = NaN;
      } else if (chordBias[t] > Math.ceil(spreadPlusRandom)) {
        // Если значение chordBias[t] превышает значение spread, ставим NaN
        volumes[t] = NaN;
      } else if (chordBias[t] > Math.floor(spreadPlusRandom)) {
        // Если значение p[t] в пределах spread, рассчитываем громкость
        volumes[t] =
          spreadPlusRandom % 1 > 0.25
            ? volumes[t] - 26 * (1 - Math.log10(1 + (spreadPlusRandom % 1) * 9))
            : NaN;
      }
    }
  }

  return volumes;
}
function calculateStringOffsets(direction, actionData) {
  let m = 0.005; // Задержка между строками
  if (actionData.accent) {
    m = 0.001;
  }

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
    let offset = t * m + 0.001 * Math.random();

    offsetResults[r] = offset;
  }
  return offsetResults;
}

// Функция getSamples с встроенной функцией l
function getSamples(chordName) {
  const chordData = chordsWithConfig[chordName];

  if (!chordData) {
    //console.debug(`Аккорд ${chordName} не найден!`);
    return [];
  }

  // Получаем строку аккорда
  const { frets } = chordData;

  // функция получене имени sampla
  const sampleName = (e, t) => {
    return ""
      .concat("o".repeat(6 - e))
      .concat(t)
      .concat("o".repeat(e - 1));
  };

  return frets.split("").map((currentChar, r) => {
    if (currentChar === "_") {
      currentChar = "F"; // Заменяем "_" на "F"
    }
    return sampleName(6 - r, currentChar);
  });
}

function playInstruction(instructions, time) {
  instructions.forEach((instruction) => {
    const { type, sample, db, offset } = instruction;

    // Убедимся, что это не "nothing", и что db - валидное число
    if (type !== "nothing" && !isNaN(db)) {
      playStringSound(sample, type, time, db, offset);
    }
  });
}

function playHit(sound, time) {
  if (sound[0].type != "nothing") {
    samplesHit["hihat"].start(time);
  }
}
const playMetronome = (
  time,
  index,
  clickMainBeat,
  clickSubbeat,
  clickTaktBeat,
  noteDuration,
) => {
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
};

function countSteps(beatPattern, currentChord) {
  const soundMap = {
    0: () => "nothing", // Пауза
    1: (index) => (index % 2 === 0 ? "down" : "up"),
    A: (index) => (index % 2 === 0 ? "downA" : "upA"),
    x: () => "x", // Специальный звук "x"
    c: (index) => (index % 2 === 0 ? "downM" : "upM"),
    h: (index) => (index % 2 === 0 ? "downH" : "upH"),
    b: (index) => (index % 2 === 0 ? "downB" : "upB"),
  };
  const samples = getSamples(currentChord);
  if (!samples || !samples.length) {
    console.warn(`Сэмплы для аккорда ${currentChord} не найдены!`);
    return [];
  }

  return beatPattern.split("").map((beat, index) => {
    const getAction = soundMap[beat] || (() => "nothing");
    const action = getAction(index);
    const direction = index % 2 === 0 ? "down" : "up";

    const actionData = actionType[action] || {};

    const { type, accent } = actionData;
    const offsets = calculateStringOffsets(direction, actionData);
    const dbs = calculateBaseStringVolumes(currentChord, actionData);

    const instructions = samples.map((sample, sampleIndex) => ({
      type,
      sample,
      db: dbs[sampleIndex] + (accent ? 0 : 0),
      offset: offsets[sampleIndex],
    }));

    return { index, instructions };
  });
}

// Хук useTone для управления воспроизведением звуков
export default function useTone() {
  const { config } = useConfig();
  const { incrementCycle, resetCycle, setBeat } = useCycle();
  // Состояние активного бита

  const seqRef = useRef(null); // Ссылка на объект Tone.Sequence

  useEffect(() => {
    if (!config.isPlaying) {
      return; // Если метроном не запущен, выходим из useEffect
    }

    Tone.getTransport().bpm.value = config.tempo || 120;
    const steps = countSteps(config.beatPattern, config.currentChord);
    // console.log(steps);
    // const durations = calcDurations(steps, config.noteDuration);

    const seq = new Tone.Sequence(
      (time, index) => {
        const sound = steps[index].instructions;
        const timeWithOfset = time + 0.1;

        Tone.getDraw().schedule(() => {
          setBeat(index);
        }, timeWithOfset);

        if (config.isBeatSound) {
          playInstruction(sound, timeWithOfset, config.isBeatSound);
        }
        if (config.isHitSound) {
          playHit(sound, timeWithOfset);
        }
        if (config.isMetronomeSound) {
          playMetronome(
            timeWithOfset,
            index,
            config.clickMainBeat,
            config.clickSubbeat,
            config.clickTaktBeat,
            config.noteDuration,
          );
        }
        if (index === steps.length - 1) {
          incrementCycle(); // Увеличиваем цикл, когда начинается новый
        }
      },

      Array.from({ length: steps.length }, (_, i) => i),
      config.noteDuration || "8n",
    ).start(0);
    seqRef.current = seq;

    return () => {
      seq.dispose();
      resetCycle();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config.isPlaying,
    config.beatPattern,
    config.isBeatSound,
    config.isHitSound,
    config.isMetronomeSound,
    config.isDownbeatSound,
    config.isUpbeatSound,
    config.isAcsentbeatSound,
    config.tempo,
    config.noteDuration,
    config.clickMainBeat,
    config.clickSubbeat,
    config.clickTaktBeat,
    config.currentChord,
  ]);

  // Старт/остановка воспроизведения
  useEffect(() => {
    if (config.isPlaying) {
      Tone.start().then(() => {
        Tone.getTransport().start();
      });
    } else {
      Tone.getTransport().stop();
      setBeat(null);
    }
  }, [config.isPlaying, setBeat]);

  return;
}
