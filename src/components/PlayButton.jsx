import { IconButton } from "@mui/material";
import { PlayIcon, SquareIcon } from "./Icons";
import * as Tone from "tone";

export default function PlayButton({ config, onConfigChanged }) {
  const handleClick = async () => {
    // Убедитесь, что Tone.js запущен
    await Tone.start();
    config.isPlaying ? Tone.getTransport().stop() : Tone.getTransport().start();

    onConfigChanged("setIsPlay", !config.isPlaying);
  };
  return (
    <IconButton
      sx={{
        color: "text.primary",
        fontSize: "60px",
        borderRadius: "50%",
        border: "1px solid #f5f5f5",
      }}
      selected={config.isPlaying}
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
