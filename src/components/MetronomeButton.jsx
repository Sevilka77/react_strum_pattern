import { IconButton, Tooltip } from "@mui/material";
import { MetrIcon } from "./Icons";

export default function MetronomeButton({ config, onConfigChanged }) {
  return (
    <Tooltip title="Включить звук метронома" placement="top">
      <IconButton
        sx={{
          color: "text.primary",
          fontSize: "40px",
          borderRadius: "50%",
          border: "1px solid#f5f5f5",
        }}
        selected={config.isMetronomeSound}
        onClick={() =>
          onConfigChanged("setIsMetronomSound", !config.isMetronomeSound)
        }
      >
        {config.isMetronomeSound ? (
          <MetrIcon fontSize="inherit" color="primary" />
        ) : (
          <MetrIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
}
