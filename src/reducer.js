const MIN_TEMPO = 40;
const MAX_TEMPO = 300;

const setTempo = (state, tempo) => {
  if (tempo === undefined) return state;
  const newTempo = Math.max(MIN_TEMPO, Math.min(MAX_TEMPO, tempo));
  return { ...state, tempo: newTempo };
};

const setBeatPattern = (state, beatPattern) => {
  if (beatPattern === undefined) return state;
  return { ...state, beatPattern: beatPattern.split("") };
};

const setNoteSize = (state, noteSize) => {
  if (noteSize === undefined) return state;
  return { ...state, noteSize };
};

const setIsPlaying = (state, isPlaying) => ({ ...state, isPlaying });
const setIsBeatSound = (state, isBeatSound) => ({ ...state, isBeatSound });
const setIsMetronomeSound = (state, isMetronomeSound) => ({
  ...state,
  isMetronomeSound,
});

export default function reducer(state, action) {
  switch (action.type) {
    case "setTempo":
      return setTempo(state, action.data.tempo);
    case "setBeatPattern":
      return setBeatPattern(state, action.data);
    case "setNoteSize":
      return setNoteSize(state, action.data);
    case "setIsPlay":
      return setIsPlaying(state, action.data);
    case "setIsBeatSound":
      return setIsBeatSound(state, action.data);
    case "setIsMetronomSound":
      return setIsMetronomeSound(state, action.data);
    default:
      return state;
  }
}
