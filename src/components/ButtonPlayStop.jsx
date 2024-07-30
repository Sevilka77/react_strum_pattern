import { IconButton } from "@mui/material";
import { PlayIcon, SquareIcon } from "./Icons";
import * as Tone from "tone";
import { memo } from "react";

const ButtonPlayStopNM = ({ isPlaying, dispatch }) => {
  const handleClick = async () => {
    // Убедитесь, что Tone.js запущен
    await Tone.start();
    isPlaying ? Tone.getTransport().stop() : Tone.getTransport().start();

    dispatch({ type: "setIsPlay", data: !isPlaying });
  };
  return (
    <IconButton
      sx={{
        color: "text.primary",
        fontSize: "60px",
      }}
      onClick={handleClick}
    >
      {isPlaying ? (
        <SquareIcon fontSize="inherit" />
      ) : (
        <PlayIcon color="primary" fontSize="inherit" />
      )}
    </IconButton>
  );
};
const ButtonPlayStop = memo(ButtonPlayStopNM);
export default ButtonPlayStop;
