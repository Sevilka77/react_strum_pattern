import { useEffect, useState } from "react";
import MetronomeBeat from "./MetronomeBeat";
import MetronomeBeatName from "./MetronomeBeatName";
import { Grid } from "@mui/material";
import { memo } from "react";
import { Paper } from "@mui/material";

const MetronomeNM = ({ noteSize, isSmd, beatPattern, activeBeat }) => {
  const [beats, setBeats] = useState(beatPattern);
  let fSize = isSmd ? 14 : 6;

  useEffect(() => {
    setBeats(beatPattern);
  }, [beatPattern, activeBeat]);
  const columns = isSmd ? 4 : 16;

  return (
    <Grid container spacing={2} sx={{ padding: 2 }} justifyContent="center">
      {beats.map((b, index) => (
        <Grid item xs={12 / columns} key={index}>
          {/* Разбиваем на строки по 4 или 2 элемента */}
          <Paper elevation={3} sx={{ borderRadius: "8px" }}>
            <MetronomeBeatName id={index} noteSize={noteSize} fSize={fSize} />
            <MetronomeBeat
              id={index}
              beatStatus={b}
              fSize={fSize}
              active={activeBeat === index}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

const Metronome = memo(MetronomeNM);
export default Metronome;
