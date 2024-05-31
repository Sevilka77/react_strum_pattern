import { IconButton } from "@mui/material";
import { createSvgIcon } from '@mui/material/utils';
const PlayIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>,
  'ArrowD',
);
const SquareIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
  </svg>,
  'ArrowD',
);

export default function PlayButton({ config, onConfigChanged }) {

  return (
    <IconButton sx={{ fontSize: "60px", borderRadius: "50%", border: "1px solid #f5f5f5" }}
      selected={config.isPlaying}
      onClick={() => onConfigChanged("setIsPlay", !config.isPlaying)}
    >
      {config.isPlaying ? <SquareIcon fontSize="inherit" /> : <PlayIcon color="primary" fontSize="inherit" />}
    </IconButton>
  );
}