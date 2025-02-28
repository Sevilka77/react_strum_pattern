import MetronomeTempoSelector from "@/features/metronome/ui/MetronomeTempoSelector";

import { Box } from "@mui/material";
import { memo } from "react";
import MetronomePlayButton from "@/features/metronome/ui/MetronomePlayButton";

import ChordChange from "@/features/tone/ui/chordChange";

const ControlFooterNM = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        pt: 1,
        pb: 1,
        flexDirection: "row", // Расставляем кнопки по строкам
        alignItems: "center",
        justifyContent: "center",

        marginBottom: 1, // Отступ перед нижней строкой
      }}
    >
      <MetronomePlayButton />
      <MetronomeTempoSelector />
      <ChordChange />
    </Box>
  );
};
const ControlFooter = memo(ControlFooterNM);
export default ControlFooter;
