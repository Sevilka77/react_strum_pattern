import { IconButton, Tooltip } from "@mui/material";
import { DrumIcon } from "./Icons";
import { useConfig } from "../useConfig";

const ButtonBeatSound = () => {
  const { config, dispatch } = useConfig();
  const onClick = () => {
    dispatch({ type: "setIsBeatSound", data: !config.isBeatSound });
  };
  return (
    <Tooltip title="Включить звук боя" placement="top">
      <IconButton
        sx={{
          color: "text.primary",
          fontSize: "40px",
          borderRadius: "50%",
        }}
        selected={config.isPlaying}
        onClick={onClick}
      >
        {config.isBeatSound ? (
          <DrumIcon color="primary" fontSize="inherit" />
        ) : (
          <DrumIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ButtonBeatSound;
