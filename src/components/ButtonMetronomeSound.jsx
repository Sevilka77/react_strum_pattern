import { FormControlLabel, Tooltip, Switch } from "@mui/material";

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
      <FormControlLabel
        label="Метроном"
        labelPlacement="end"
        control={
          <Switch
            checked={isMetronomeSound}
            onChange={onClick}
            inputProps={{ "aria-label": "controlled" }}
            label="Метроном"
            labelPlacement="end"
          />
        }
      />
    </Tooltip>
  );
};
const ButtonMetronomeSound = memo(ButtonMetronomeSoundNM);
export default ButtonMetronomeSound;
