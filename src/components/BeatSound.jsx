import { IconButton } from "@mui/material";
import { DrumIcon } from "./Icons";

export default function BeatSound({ config, onConfigChanged }) {
  return (
    <IconButton
      sx={{
        color: "text.primary",
        fontSize: "40px",
        borderRadius: "50%",
        border: "1px solid#f5f5f5",
      }}
      selected={config.isPlaying}
      onClick={() => onConfigChanged("setIsBeatSound", !config.isBeatSound)}
    >
      {config.isBeatSound ? (
        <DrumIcon color="primary" fontSize="inherit" />
      ) : (
        <DrumIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}
