import useStepMetronome from "../hooks/useStepMetronome";
import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import usePlayClickSound from "../hooks/usePlaySound";

import { Stack } from '@mui/system';




export default function Metronome({ config, isPlaying }) {
  const [beats, setBeats] = useState(config.beatPattern);
  const [activeBeat, setActiveBeat] = useStepMetronome(
    config.tempo,
    config.beatPattern,
    config.note,
    isPlaying
  );

  usePlayClickSound(activeBeat, config.note, isPlaying);

  useEffect(() => {
    setBeats(config.beatPattern)
  }, [config.beatPattern, setActiveBeat])

  const beatStatusChanged = (index, status) => {
    setBeats((curr) => {
      const newBeats = [...curr];

      newBeats[index] = status;

      return newBeats;
    });
  };

  return (

    <Stack direction="row" gap={1} >
      {beats.map((b, index) => (
        <MetronomeBeat
          key={index}
          id={index}
          beatStatus={b}
          onBeatStatusChanged={(status) => beatStatusChanged(index, status)}
          active={activeBeat == index}
        />
      ))}
    </Stack>
  );
}