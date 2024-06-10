import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import { Stack } from "@mui/system";

export default function Metronome({ config, isSmd, beatPattern, activeBeat }) {
  const [beats, setBeats] = useState(beatPattern);

  useEffect(() => {
    setBeats(beatPattern);
  }, [beatPattern, activeBeat]);

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
          noteSize={config.noteSize}
          beatStatus={b}
          isSmd={isSmd}
          beatsLen={beats.length}
          active={activeBeat == index}
        />
      ))}
    </Stack>
  );
}
