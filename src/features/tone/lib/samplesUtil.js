import * as Tone from "tone";

import { players, stringChannels } from "./toneSetup";
import { Chords } from "../config/chords";

const sampleFiles = import.meta.glob("@/assets/samples/*.mp3", {
  query: "?url",
  eager: true,
});

export function generateSampleName(stringIndex, note) {
  return ""
    .concat("o".repeat(6 - stringIndex))
    .concat(note)
    .concat("o".repeat(stringIndex - 1));
}
export function getSamples(chordName) {
  const chordData = Chords[chordName];

  if (!chordData) {
    return [];
  }

  // Получаем строку аккорда
  const { frets } = chordData;

  // функция получене имени sampla

  return frets.split("").map((currentChar, r) => {
    if (currentChar === "_") {
      currentChar = "F"; // Заменяем "_" на "F"
    }
    return generateSampleName(6 - r, currentChar);
  });
}

export function getSampleVariations(sampleName) {
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

export async function loadChordSample(chordName) {
  const chordData = Chords[chordName];

  if (!chordData) {
    console.warn(`Аккорд ${chordName} не найден!`);
    return [];
  }

  // Получаем лады аккорда
  const { frets } = chordData;

  // Пробегаем по каждой струне аккорда
  const promises = frets.split("").map(async (note, stringIndex) => {
    if (note === "_") note = "F";

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
      } catch (error) {
        console.error(`Error loading sample ${sample}:`, error);
      }
    });
    await Promise.all(variationPromises);
  });

  await Promise.all(promises);
}
export async function loadAllChordsSamples() {
  // Проходим по всем аккордам
  try {
    await Promise.all(
      Object.keys(Chords).map(async (chordName) => {
        await loadChordSample(chordName); // Загружаем аккорд по имени
      }),
    );
    console.debug("Все аккорды успешно загружены!");
  } catch (error) {
    console.error("Ошибка при загрузке аккордов:", error);
  }
}
