import useStepMetronome from "../hooks/useStepMetronome";
import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import useMetronomeSound from "../hooks/useMetronomeSound";
import useBeatSound from "../hooks/useBeatSound"


import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import Divider from '@mui/material/Divider';





export default function Metronome({ config, isPlaying, isMetronomeSound, isBeatSound }) {
  const [beats, setBeats] = useState(config.beatPattern);
  const [activeBeat, setActiveBeat] = useStepMetronome(
    config.tempo,
    config.beatPattern,
    config.note,
    isPlaying
  );

  useMetronomeSound(activeBeat, config.note, isPlaying, isMetronomeSound);
  useBeatSound(activeBeat, beats, isPlaying, isBeatSound);

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
    <Box
      sx={{
        width: {
          md: 300, // theme.breakpoints.up('md')
          lg: 400, // theme.breakpoints.up('lg')
          xl: 500, // theme.breakpoints.up('xl')
        },
      }}
    >

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} >
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

    </Box>
  );
}

