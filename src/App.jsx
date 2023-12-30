

import { useState, useReducer } from 'react';
import PlayStopButton from './components/PlayStopButton'
import BeatCountSelector from './components/BeatCountSelector';
import Metronome from './components/Metronome';
import PatternList from './components/PatternLIst';
import TempoSelector from './components/TempoSelector';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
//import { Tally4, Tally3, Tally2, Tally1 } from 'lucide-react'



export const MIN_TEMPO = 40;
export const MAX_TEMPO = 220;
export const MIN_BEAT_COUNT = 1;
export const MAX_BEAT_COUNT = 7;


function reducer(state, action) {
  const newState = { ...state };

  switch (action.type) {
    case "setTempo":
      // eslint-disable-next-line no-case-declarations
      let newTempo = action.data.tempo;
      if (newTempo === undefined) return state;

      newTempo = Math.min(newTempo, MAX_TEMPO);
      newTempo = Math.max(newTempo, MIN_TEMPO);
      newState.tempo = newTempo;
      break;

    case "setBeatCount":
      // eslint-disable-next-line no-case-declarations
      let beatCount = action.data.beatCount;
      if (beatCount === undefined) return state;

      beatCount = Math.min(beatCount, MAX_BEAT_COUNT);
      beatCount = Math.max(beatCount, MIN_BEAT_COUNT);
      newState.beatCount = beatCount;
      break;
    case "setBeatPattern":
      // eslint-disable-next-line no-case-declarations
      let beatPattern = action.data.beatPattern.pattern;
      // eslint-disable-next-line no-case-declarations
      let note = action.data.beatPattern.note;
      if (beatPattern === undefined) return state;
      newState.beatPattern = beatPattern;
      if (note === undefined) return state;
      newState.note = note;
      break;
    case "setNoteSize":
      // eslint-disable-next-line no-case-declarations
      let noteSize = action.data.noteS;
      if (noteSize === undefined) return state;
      newState.note = noteSize;
      break;
    default:
      return state;
  }

  return newState;
}

function App() {

  const [isPlaying, setIsPlaying] = useState(false);

  const [config, dispatch] = useReducer(reducer, {
    tempo: 60,
    beatPattern: ["work", "rest", "rest", "rest"],
    note: 1,
    isPlaying,
  });

  return (
    <Stack gap={2} alignItems="center">
      <Stack direction="row" gap={1} >
        <Button onClick={() => dispatch({ type: "setNoteSize", data: { noteS: 1 } })}>Четвертые</Button>
        <Button onClick={() => dispatch({ type: "setNoteSize", data: { noteS: 2 } })}>Восьмые</Button>
        <Button onClick={() => dispatch({ type: "setNoteSize", data: { noteS: 3 } })}>Триоли</Button>
        <Button onClick={() => dispatch({ type: "setNoteSize", data: { noteS: 4 } })}>Шестнадцатые</Button>
      </Stack>
      <TempoSelector
        onTempoChanged={(tempo) => dispatch({ type: "setTempo", data: { tempo } })}
        tempo={config.tempo}
      />
      <PatternList onPatternChanged={(beatPattern) => dispatch({ type: "setBeatPattern", data: { beatPattern } })}></PatternList>
      <Metronome config={config} isPlaying={isPlaying} />
      <PlayStopButton onPlayStopChanged={setIsPlaying} />
      <BeatCountSelector
        onBeatCountChanged={(beatCount) => dispatch({ type: "setBeatCount", data: { beatCount } })}
        beatCount={config.beatCount}
      />

    </Stack>
  )
}
export default App
