import MetronomeTempoSelector from "@/features/metronome/ui/MetronomeTempoSelector";

import { Box } from "@mui/material";
import { memo } from "react";
import MetronomePlayButton from "@/features/metronome/ui/MetronomePlayButton";

import ChordChange from "./ChordChange";

const ControlFooterNM = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* {children && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column", // Расставляем кнопки по строкам
            justifyContent: "center",
            marginBottom: "8px", // Отступ перед нижней строкой
          }}
        >
          {children}
        </Box>
      )} */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row", // Расставляем кнопки по строкам
          justifyContent: "center",
          marginBottom: 1, // Отступ перед нижней строкой
        }}
      >
        <MetronomePlayButton></MetronomePlayButton>
        <MetronomeTempoSelector />
        <ChordChange />
      </Box>
    </Box>
  );
};
const ControlFooter = memo(ControlFooterNM);
export default ControlFooter;
