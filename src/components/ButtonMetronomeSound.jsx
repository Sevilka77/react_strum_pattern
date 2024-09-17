import { FormControlLabel, Switch } from "@mui/material";

import { memo } from "react";

const ButtonMetronomeSoundNM = ({ isMetronomeSound, dispatch }) => {
  const onClick = () => {
    dispatch({
      type: "setIsMetronomSound",
      data: !isMetronomeSound,
    });
  };

  return (
    <FormControlLabel
      label="Метроном"
      labelPlacement="end"
      control={
        <Switch
          checked={isMetronomeSound}
          onChange={onClick}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
const ButtonMetronomeSound = memo(ButtonMetronomeSoundNM);
export default ButtonMetronomeSound;
