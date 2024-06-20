import { IconButton, Tooltip } from "@mui/material";
import { MetrIcon } from "./Icons";
import { useConfig } from "../useConfig";

const MetronomeButton = () => {
  const { config, dispatch } = useConfig();
  const onClick = () => {
    dispatch({
      type: "setIsMetronomSound",
      data: !config.isMetronomeSound,
    });
  };

  return (
    <Tooltip title="Включить звук метронома" placement="top">
      <IconButton
        sx={{
          color: "text.primary",
          fontSize: "40px",
          borderRadius: "50%",
        }}
        selected={config.isMetronomeSound}
        onClick={onClick}
      >
        {config.isMetronomeSound ? (
          <MetrIcon fontSize="inherit" color="primary" />
        ) : (
          <MetrIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default MetronomeButton;
