import { FormControlLabel, Switch } from "@mui/material";

import { memo } from "react";

const ButtonAcsentbeatSoundNM = ({ isAcsentbeatSound, dispatch }) => {
  const onClick = () => {
    dispatch({
      type: "setIsAcsentbeatSound",
      data: !isAcsentbeatSound,
    });
  };

  return (
    <FormControlLabel
      label="Клик на первую долю"
      labelPlacement="end"
      control={
        <Switch
          checked={isAcsentbeatSound}
          onChange={onClick}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
const ButtonAcsentbeatSound = memo(ButtonAcsentbeatSoundNM);
export default ButtonAcsentbeatSound;
