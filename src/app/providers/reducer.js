const setTempo = (state, tempo) => {
  if (tempo === undefined) return state;
  const newTempo = Math.max(40, Math.min(300, tempo));
  return { ...state, tempo: newTempo };
};
const setRepeatCount = (state, count) => {
  if (count === undefined) return state;

  return { ...state, count };
};

const setBeatPattern = (state, beatPattern) => {
  if (beatPattern === undefined) return state;
  return { ...state, beatPattern: beatPattern };
};

const setNoteDuration = (state, noteDuration) => {
  if (noteDuration === undefined) return state;
  return { ...state, noteDuration };
};

const setIsPlaying = (state, isPlaying) => ({ ...state, isPlaying });
const setIsBeatSound = (state, isBeatSound) => ({ ...state, isBeatSound });
const setIsHitSound = (state, isHitSound) => ({ ...state, isHitSound });
const setIsMetronomeSound = (state, isMetronomeSound) => ({
  ...state,
  isMetronomeSound,
});
const setClickAlways = (state, clickAlways) => ({
  ...state,
  clickAlways,
});
const setClickMainBeat = (state, clickMainBeat) => ({
  ...state,
  clickMainBeat,
});
const setClickSubbeat = (state, clickSubbeat) => ({
  ...state,
  clickSubbeat,
});
const setClickTaktBeat = (state, clickTaktBeat) => ({
  ...state,
  clickTaktBeat,
});
const setEditMode = (state, editMode) => ({
  ...state,
  editMode,
});
const setCurrentChord = (state, currentChord) => ({ ...state, currentChord });
export default function reducer(state, action) {
  switch (action.type) {
    case "setTempo":
      return setTempo(state, action.data);
    case "setBeatPattern":
      return setBeatPattern(state, action.data);
    case "setIsPlay":
      return setIsPlaying(state, action.data);
    case "setIsBeatSound":
      return setIsBeatSound(state, action.data);
    case "setIsHitSound":
      return setIsHitSound(state, action.data);
    case "setIsMetronomSound":
      return setIsMetronomeSound(state, action.data);
    case "setClickAlways":
      return setClickAlways(state, action.data);
    case "setClickMainBeat":
      return setClickMainBeat(state, action.data);
    case "setClickSubbeat":
      return setClickSubbeat(state, action.data);
    case "setClickTaktBeat":
      return setClickTaktBeat(state, action.data);
    case "setNoteDuration":
      return setNoteDuration(state, action.data);
    case "setEditMode":
      return setEditMode(state, action.data);
    case "setCurrentChord":
      return setCurrentChord(state, action.data);
    case "setRepeatCount":
      return setRepeatCount(state, action.data);
    default:
      return state;
  }
}
