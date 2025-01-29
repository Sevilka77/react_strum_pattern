import { useConfigSelector } from "../hooks/useConfigSelector";

import TempoSelector from "./TempoSelector";

import { Box, Button } from "@mui/material";
import { memo, useEffect } from "react";
import { PlayIcon, SquareIcon } from "./Icons";
import * as Tone from "tone";
import ChordChange from "./ChordChange";

const ControlFooterNM = ({ children }) => {
  const [isPlaying, dispatch] = useConfigSelector((config) => config.isPlaying);
  const handleClick = async () => {
    // Убедитесь, что Tone.js запущен
    await Tone.start();
    isPlaying ? Tone.getTransport().stop() : Tone.getTransport().start();

    dispatch({ type: "setIsPlay", data: !isPlaying });
  };
  useEffect(() => {
    return () => {
      if (isPlaying) {
        dispatch({ type: "setIsPlay", data: false }); // Остановить воспроизведение
      }
    };
  }, [dispatch, isPlaying]);
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
      {children && (
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
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row", // Расставляем кнопки по строкам
          justifyContent: "center",
          marginBottom: 1, // Отступ перед нижней строкой
        }}
      >
        <Button
          sx={{
            width: "40px",
            minWidth: "40px",
            px: 0,
          }}
          value="play"
          onClick={handleClick}
        >
          {isPlaying ? <SquareIcon /> : <PlayIcon />}
        </Button>
        <TempoSelector />
        <ChordChange />
      </Box>
    </Box>
  );
};
const ControlFooter = memo(ControlFooterNM);
export default ControlFooter;
