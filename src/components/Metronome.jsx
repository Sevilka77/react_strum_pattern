import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import { Stack } from "@mui/system";
import useTone from "../hooks/useTone";

export default function Metronome({ config, isSmd, beatPattern }) {
  const [beats, setBeats] = useState(beatPattern);
  const [activeBeat, setActiveBeat] = useTone(config, beatPattern);

  useEffect(() => {
    setBeats(beatPattern);
  }, [beatPattern, setActiveBeat]);

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
          isSmd={isSmd}
          beatsLen={beats.length}
          a
          active={activeBeat == index}
        />
      ))}
    </Stack>
  );
}
