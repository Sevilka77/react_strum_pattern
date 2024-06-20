import { IconButton, Tooltip } from "@mui/material";
import { MetrIcon } from "./Icons";

import { memo } from "react";

const ButtonMetronomeSoundNM = ({ isMetronomeSound, dispatch }) => {
  const onClick = () => {
    dispatch({
      type: "setIsMetronomSound",
      data: !isMetronomeSound,
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
        selected={isMetronomeSound}
        onClick={onClick}
      >
        {isMetronomeSound ? (
          <MetrIcon fontSize="inherit" color="primary" />
        ) : (
          <MetrIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
};
const ButtonMetronomeSound = memo(ButtonMetronomeSoundNM);
export default ButtonMetronomeSound;
