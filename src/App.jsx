

import { useState, useReducer } from 'react';

import Metronome from './components/Metronome';
import PatternList from './components/PatternLIst';
import TempoSelector from './components/TempoSelector';
import TimeSelect from './components/TimeSelect'

import { Stack, ToggleButton } from '@mui/material';

import Visual from './components/visual';
import { Volume2Icon, VolumeXIcon, DrumIcon, PlayIcon, SquareIcon } from 'lucide-react';



//import { Tally4, Tally3, Tally2, Tally1 } from 'lucide-react'



export const MIN_TEMPO = 40;
export const MAX_TEMPO = 220;

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
      let beatPattern = action.data.beatPattern.pattern.split('');

      if (beatPattern === undefined) return state;
      newState.beatPattern = beatPattern;
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
  const [isMetronomeSound, setIsMetronomeSound] = useState(false);
  const [isBeatSound, setIsBeatSound] = useState(false);


  let beat = "1101"
  const [config, dispatch] = useReducer(reducer, {
    tempo: 60,
    beatPattern: beat.split(''),
    note: 4,
    isPlaying,
  });

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
        <TimeSelect
          onNoteChanged={(noteS) => dispatch({ type: "setNoteSize", data: { noteS } })}
          note={config.note}
        />
        <ToggleButton
          value="MS"
          selected={isMetronomeSound}
          onChange={() => {
            setIsMetronomeSound(!isMetronomeSound)
          }}
        >
          {isMetronomeSound ? <VolumeXIcon /> : <Volume2Icon />}
        </ToggleButton>
        <ToggleButton
          value="BS"
          selected={isBeatSound}
          onChange={() => {
            setIsBeatSound(!isBeatSound)
          }}
        >
          <DrumIcon />
        </ToggleButton>
        <ToggleButton
          value="chplayeck"
          selected={isPlaying}
          onChange={() => {
            setIsPlaying(!isPlaying)
          }}
        >
          {isPlaying ? <SquareIcon /> : <PlayIcon />}
        </ToggleButton>
      </Stack>
      <TempoSelector
        onTempoChanged={(tempo) => dispatch({ type: "setTempo", data: { tempo } })}
        tempo={config.tempo}
      />



      <Metronome config={config} isPlaying={isPlaying} isMetronomeSound={isMetronomeSound} isBeatSound={isBeatSound} />

      <Visual toggleStart={isPlaying ? 'swing' : 'stop'} swing={(120 / config.tempo)} />
      {/* <BeatCountSelector
        onBeatCountChanged={(beatCount) => dispatch({ type: "setBeatCount", data: { beatCount } })}
        beatCount={config.beatPattern.length}
      /> */}
      <PatternList onPatternChanged={(beatPattern) => dispatch({ type: "setBeatPattern", data: { beatPattern } })}></PatternList>

    </Stack>
  )
}
export default App
