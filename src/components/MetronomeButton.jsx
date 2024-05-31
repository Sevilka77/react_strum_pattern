import { IconButton } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";

const PlayIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" d="M10.125 14.787 3.375 3.564" />
    <path d="M7.125 14.791H18.75" />
    <path
      strokeLinecap="round"
      d="M13.125 4.525v10.261M10.875 8.057h2.25M15.375 9.658h-2.25M10.875 12.223h2.25"
    />
    <path d="M10.56 1.5h4.761a.5.5 0 0 1 .488.392l4.167 18.91a1.5 1.5 0 0 1-1.465 1.823H7.52a1.5 1.5 0 0 1-1.467-1.812L10.07 1.896a.5.5 0 0 1 .49-.396Z" />
    <path d="M5.952 5.313 3.568 6.675a.5.5 0 0 0-.105.788l1.769 1.769a.5.5 0 0 0 .599.082l1.322-.744a.5.5 0 0 0 .234-.578l-.708-2.387a.5.5 0 0 0-.727-.292Z" />{" "}
  </svg>,
  "ArrowU",
);

export default function MetronomeButton({ config, onConfigChanged }) {
  return (
    <IconButton
      sx={{ fontSize: "40px", borderRadius: "50%", border: "1px solid#f5f5f5" }}
      selected={config.isMetronomeSound}
      onClick={() =>
        onConfigChanged("setIsMetronomSound", !config.isMetronomeSound)
      }
    >
      {config.isMetronomeSound ? (
        <PlayIcon fontSize="inherit" color="primary" />
      ) : (
        <PlayIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}
