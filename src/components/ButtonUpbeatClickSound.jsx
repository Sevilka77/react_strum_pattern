import { FormControlLabel, Switch } from "@mui/material";

import { memo } from "react";

const ButtonUpbeatClickSoundNM = ({ isUpbeatClickSound, dispatch }) => {
  const onClick = () => {
    dispatch({
      type: "setIsUpbeatClickSound",
      data: !isUpbeatClickSound,
    });
  };

  return (
    <FormControlLabel
      label='Клик на "И"'
      labelPlacement="end"
      control={
        <Switch
          checked={isUpbeatClickSound}
          onChange={onClick}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
const ButtonUpbeatClickSound = memo(ButtonUpbeatClickSoundNM);
export default ButtonUpbeatClickSound;
