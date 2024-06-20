import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import { Stack } from "@mui/system";
import { memo } from "react";

const MetronomeNM = ({ noteSize, isSmd, beatPattern, activeBeat }) => {
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
          noteSize={noteSize}
          beatStatus={b}
          isSmd={isSmd}
          beatsLen={beats.length}
          active={activeBeat == index}
        />
      ))}
    </Stack>
  );
};

const Metronome = memo(MetronomeNM);
export default Metronome;
