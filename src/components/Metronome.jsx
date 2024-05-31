import useStepMetronome from "../hooks/useStepMetronome";
import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import useMetronomeSound from "../hooks/useMetronomeSound";
import useBeatSound from "../hooks/useBeatSound";

import { Stack } from "@mui/system";

export default function Metronome({ config, beatPattern }) {
  const [beats, setBeats] = useState(beatPattern);
  const [activeBeat, setActiveBeat] = useStepMetronome(
    config.tempo,
    beatPattern,
    config.isPlaying,
  );

  useMetronomeSound(
    activeBeat,
    config.isPlaying,
    config.isMetronomeSound,
    config.note,
  );
  useBeatSound(activeBeat, config.isPlaying, config.isBeatSound, beats);

  useEffect(() => {
    setBeats(beatPattern);
  }, [beatPattern, setActiveBeat]);

  // const beatStatusChanged = (index, status) => {
  //   setBeats((curr) => {
  //     const newBeats = [...curr];

  //     newBeats[index] = status;

  //     return newBeats;
  //   });
  // };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexBasis="content"
      sx={{ height: "50vh" }}
    >
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
