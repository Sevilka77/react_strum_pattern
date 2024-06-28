import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import MetronomeBeatName from "./MetronomeBeatName";
import { Stack } from "@mui/system";
import { memo } from "react";

const MetronomeNM = ({ noteSize, isSmd, beatPattern, activeBeat }) => {
  const [beats, setBeats] = useState(beatPattern);
  let fSize = isSmd
    ? beats.length !== 0
      ? Math.min(18, 94 / beats.length)
      : 0
    : 6;

  useEffect(() => {
    setBeats(beatPattern);
  }, [beatPattern, activeBeat]);

  return beats.map((b, index) => (
    <Stack
      key={index}
      orientation="vertical"
      sx={{
        width: "auto",
      }}
    >
      <MetronomeBeatName id={index} noteSize={noteSize} fSize={fSize} />
      <MetronomeBeat
        id={index}
        beatStatus={b}
        fSize={fSize}
        active={activeBeat == index}
      />
    </Stack>
  ));
};

const Metronome = memo(MetronomeNM);
export default Metronome;
