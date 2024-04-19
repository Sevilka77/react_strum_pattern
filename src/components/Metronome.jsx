import useStepMetronome from "../hooks/useStepMetronome";
import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import useMetronomeSound from "../hooks/useMetronomeSound";
import useBeatSound from "../hooks/useBeatSound"

import { Stack } from '@mui/system';






export default function Metronome({ config, beatPattern, isPlaying, isMetronomeSound, isBeatSound }) {

  const [beats, setBeats] = useState(beatPattern);
  const [activeBeat, setActiveBeat] = useStepMetronome(
    config.tempo,
    beatPattern,
    isPlaying,
  );



  useMetronomeSound(activeBeat, isPlaying, isMetronomeSound, config.note,);
  useBeatSound(activeBeat, beats, isPlaying, isBeatSound);

  useEffect(() => {
    setBeats(beatPattern)
  }, [beatPattern, setActiveBeat])

  // const beatStatusChanged = (index, status) => {
  //   setBeats((curr) => {
  //     const newBeats = [...curr];

  //     newBeats[index] = status;

  //     return newBeats;
  //   });
  // };

  return (

    <Stack direction="row"
      justifyContent="center"
      alignItems="flex-start"
      flexBasis="content"
      sx={{ width: 1 }} >
      {beats.map((b, index) => (
        <MetronomeBeat
          key={index}
          id={index}
          note={config.note}
          beatStatus={b}
          //onBeatStatusChanged={(status) => beatStatusChanged(index, status)}
          active={activeBeat == index}

        />
      ))}
    </Stack>

  );
}

