import { Chords } from "../config/chords";

export function calculateBaseStringVolumes(chordName, actionData) {
  const chord = Chords[chordName];
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
export function calculateStringsOffsets(direction, actionData) {
  const m = actionData.accent ? 0.001 : 0.005;
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
    offsetResults[r] = t * m + 0.001 * Math.random();
  }
  return offsetResults;
}
