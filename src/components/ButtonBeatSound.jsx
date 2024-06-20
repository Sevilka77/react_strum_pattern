import { IconButton, Tooltip } from "@mui/material";
import { DrumIcon } from "./Icons";

import { memo } from "react";

const ButtonBeatSoundNM = ({ isBeatSound, dispatch }) => {
  const onClick = () => {
    dispatch({ type: "setIsBeatSound", data: !isBeatSound });
  };
  return (
    <Tooltip title="Включить звук боя" placement="top">
      <IconButton
        sx={{
          color: "text.primary",
          fontSize: "40px",
          borderRadius: "50%",
        }}
        selected={isBeatSound}
        onClick={onClick}
      >
        {isBeatSound ? (
          <DrumIcon color="primary" fontSize="inherit" />
        ) : (
          <DrumIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
};
const ButtonBeatSound = memo(ButtonBeatSoundNM);
export default ButtonBeatSound;
