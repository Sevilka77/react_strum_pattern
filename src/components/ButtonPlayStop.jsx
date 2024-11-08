import { PlayIcon, SquareIcon } from "./Icons";
import * as Tone from "tone";
import { memo } from "react";
import { IconButton } from "@mui/material";

const ButtonPlayStopNM = ({ isPlaying, dispatch }) => {
  const handleClick = async () => {
    // Убедитесь, что Tone.js запущен
    await Tone.start();
    isPlaying ? Tone.getTransport().stop() : Tone.getTransport().start();

    dispatch({ type: "setIsPlay", data: !isPlaying });
  };
  return (
    <IconButton
      sx={{ color: "inherit" }}
      onClick={handleClick}
      aria-label="Старт/стоп воспроизведения"
    >
      {isPlaying ? <SquareIcon /> : <PlayIcon />}
    </IconButton>
  );
};
const ButtonPlayStop = memo(ButtonPlayStopNM);
export default ButtonPlayStop;
