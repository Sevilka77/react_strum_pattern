import { FormControlLabel, Tooltip, Switch } from "@mui/material";

import { memo } from "react";

const ButtonDownBeatNM = ({ isDownbeatSound, dispatch }) => {
  const onClick = () => {
    dispatch({
      type: "setIsDownbeatSound",
      data: !isDownbeatSound,
    });
  };

  return (
    <Tooltip title="Включить звук метронома" placement="top">
      <FormControlLabel
        label="Акцент метронома"
        labelPlacement="end"
        control={
          <Switch
            checked={isDownbeatSound}
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
const ButtonDownbeatSound = memo(ButtonDownBeatNM);
export default ButtonDownbeatSound;
