import { IconButton } from "@mui/material";
import { PlayIcon, SquareIcon } from "./Icons";

export default function PlayButton({ config, onConfigChanged }) {
  return (
    <IconButton
      sx={{
        color: "text.primary",
        fontSize: "60px",
        borderRadius: "50%",
        border: "1px solid #f5f5f5",
      }}
      selected={config.isPlaying}
      onClick={() => onConfigChanged("setIsPlay", !config.isPlaying)}
    >
      {config.isPlaying ? (
        <SquareIcon fontSize="inherit" />
      ) : (
        <PlayIcon color="primary" fontSize="inherit" />
      )}
    </IconButton>
  );
}
