import { useState, useReducer, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import Metronome from './components/Metronome';
import PatternList from './components/PatternLIst';
import TempoSelector from './components/TempoSelector';
import TimeSelect from './components/TimeSelect'
//import Input from './components/Input';

import { Stack, ToggleButton } from '@mui/material';

import Visual from './components/visual';
import { Volume2Icon, VolumeXIcon, DrumIcon, PlayIcon, SquareIcon } from 'lucide-react';

export const MIN_TEMPO = 40;
export const MAX_TEMPO = 300;

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
      let beatPattern = action.data.split('');

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMetronomeSound, setIsMetronomeSound] = useState(false);
  const [isBeatSound, setIsBeatSound] = useState(false);



  const [config, dispatch] = useReducer(reducer, {
    tempo: 60,
    beatPattern: "1101".split(""),
    note: 4,
    isPlaying,
  });

  useEffect(() => {
    if (!searchParams.get("p")) {
      setSearchParams({ p: "1101" })

    }
    else {
      console.log(searchParams.get("p"))
      dispatch({ type: "setBeatPattern", data: searchParams.get("p") });
    }
  }, [searchParams]
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
        dispatch({ type: "setBeatPattern", data: beatPattern.pattern });
      /> */}
      <PatternList onPatternChanged={(beatPattern) => { setSearchParams({ p: beatPattern.pattern }) }}></PatternList>

    </Stack >
  )
}
export default App
