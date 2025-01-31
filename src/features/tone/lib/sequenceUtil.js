import { Actions } from "../config/actions";
import { getSamples } from "./samplesUtil";
import {
  calculateBaseStringVolumes,
  calculateStringsOffsets,
} from "./stringsUtil";

export function sequenceGenerateSteps(beatPattern, currentChord) {
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

    const actionData = Actions[action] || {};

    const { type, accent } = actionData;
    const offsets = calculateStringsOffsets(direction, actionData);
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
