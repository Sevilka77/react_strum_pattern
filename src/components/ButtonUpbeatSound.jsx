import { FormControlLabel, Switch } from "@mui/material";

import { memo } from "react";

const ButtonUpbeatClickSoundNM = ({ isUpbeatSound, dispatch }) => {
  const onClick = () => {
    dispatch({
      type: "setIsUpbeatSound",
      data: !isUpbeatSound,
    });
  };

  return (
    <FormControlLabel
      label="Клик на слабую долю"
      labelPlacement="end"
      control={
        <Switch
          checked={isUpbeatSound}
          onChange={onClick}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
const ButtonUpbeatSound = memo(ButtonUpbeatClickSoundNM);
export default ButtonUpbeatSound;
