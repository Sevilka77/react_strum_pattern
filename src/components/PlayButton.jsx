import { IconButton } from "@mui/material";
import { PlayIcon, SquareIcon } from "./Icons";
import * as Tone from "tone";
import { useConfig } from "../useConfig";

export default function PlayButton() {
  const { config, dispatch } = useConfig();
  const handleClick = async () => {
    // Убедитесь, что Tone.js запущен
    await Tone.start();
    config.isPlaying ? Tone.getTransport().stop() : Tone.getTransport().start();

    dispatch({ type: "setIsPlay", data: !config.isPlaying });
  };
  return (
    <IconButton
      sx={{
        color: "text.primary",
        fontSize: "60px",
        borderRadius: "50%",
      }}
      onClick={handleClick}
    >
      {config.isPlaying ? (
        <SquareIcon fontSize="inherit" />
      ) : (
        <PlayIcon color="primary" fontSize="inherit" />
      )}
    </IconButton>
  );
}
