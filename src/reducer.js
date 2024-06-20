const setTempo = (state, tempo) => {
  if (tempo === undefined) return state;
  const newTempo = Math.max(40, Math.min(300, tempo));
  return { ...state, tempo: newTempo };
};

const setBeatPattern = (state, beatPattern) => {
  if (beatPattern === undefined) return state;
  return { ...state, beatPattern: beatPattern };
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
      return setTempo(state, action.data);
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
