import { useState, useReducer, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import Metronome from './components/Metronome';
import PatternList from './components/PatternLIst';
import PatternEdit from './components/PatternEdit';
import TempoSelector from './components/TempoSelector';
import ControlBar from './components/ControlBar';


import { Stack } from '@mui/material';

import Visual from './components/visual';
//import { Volume2Icon, VolumeXIcon, DrumIcon, PlayIcon, SquareIcon } from 'lucide-react';
//import Share from './components/Share';

export const MIN_TEMPO = 40;
export const MAX_TEMPO = 300;

function reducer(state, action) {
  const newState = { ...state };
  console.log(action.type)
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
      // eslint-disable-next-line no-case-declarations
      let beatPatternCount = state.beatPattern;
      if (beatCount > beatPatternCount.length) {
        for (let i = beatPatternCount.length; i < beatCount; i++) beatPatternCount.push("rest");
      } else if (beatCount < state.beatPattern.length) {
        for (let i = beatPatternCount.length; i > beatCount; i--) beatPatternCount.pop();
      }
      newState.beatPattern = beatPatternCount;
      break;
    case "setBeatPattern":
      // eslint-disable-next-line no-case-declarations
      let beatPattern = action.data.split('');
      if (beatPattern === undefined) return state;
      newState.beatPattern = beatPattern;
      break;
    case "setNoteSize":
      // eslint-disable-next-line no-case-declarations
      let noteSize = action.data;
      if (noteSize === undefined) return state;
      newState.note = noteSize;
      break;
    case "setIsPlay":
      newState.isPlaying = action.data;
      break;
    case "setIsBeatSound":
      newState.isBeatSound = action.data;
      break;
    case "setIsMetronomSound":
      newState.isMetronomeSound = action.data;
      break;
    default:
      return state;
  }
  return newState;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [beatPattern, setBeatPattern] = useState("1101");


  const [config, dispatch] = useReducer(reducer, {
    tempo: 60,
    note: 4,
    isPlaying: false,
    isMetronomeSound: false,
    isBeatSound: false
  });

  useEffect(() => {
    if (!searchParams.has("p")) {

      setSearchParams({ p: "1101" })

    }
    else {
      console.log(searchParams.get("p"));
      setBeatPattern(searchParams.get("p"));
    }
  }, [searchParams, setSearchParams]
  );



  return (
    <Stack direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: 1

      }}
    >
      <Stack direction="row"
        justifyContent="center"
        alignItems="flex-end"
        flexBasis="content"
      >
        <ControlBar
          onConfigChanged={(event, data) => dispatch({ type: event, data: data })}
          config={config}
        />
      </Stack>

      <TempoSelector
        config={config}
        onTempoChanged={(tempo) => dispatch({ type: "setTempo", data: { tempo } })}
      />
      <Metronome config={config} beatPattern={beatPattern.split('')} />
      <Visual toggleStart={config.isPlaying ? 'swing' : 'stop'} swing={(120 / config.tempo)} />
      <PatternList onPatternChanged={(beatPattern) => { setSearchParams({ p: beatPattern.pattern }) }}></PatternList>
      <PatternEdit beatPattern={beatPattern.split('')} onPatternChanged={(beatPattern) => { setSearchParams({ p: beatPattern }) }} />

    </Stack >
  )
}
export default App
