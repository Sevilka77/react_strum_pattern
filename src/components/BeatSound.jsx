import { IconButton } from "@mui/material";
import { createSvgIcon } from '@mui/material/utils';
const DrumIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path d="m2 2 8 8"></path><path d="m22 2-8 8"></path><ellipse cx="12" cy="9" rx="10" ry="5"></ellipse><path d="M7 13.4v7.9"></path><path d="M12 14v8"></path><path d="M17 13.4v7.9"></path><path d="M2 9v8a10 5 0 0 0 20 0V9"></path>
  </svg>,
  'Drum',
);

export default function BeatSound({ config, onConfigChanged }) {

  return (
    <IconButton sx={{ fontSize: "40px", borderRadius: "50%", border: "1px solid#f5f5f5" }}
      selected={config.isPlaying}
      onClick={() => onConfigChanged("setIsBeatSound", !config.isBeatSound)}
    >
      {config.isBeatSound ? <DrumIcon color="primary" fontSize="inherit" /> : <DrumIcon fontSize="inherit" />}
    </IconButton>
  );
}