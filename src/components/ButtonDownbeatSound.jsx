import { FormControlLabel, Switch } from "@mui/material";

import { memo } from "react";

const ButtonDownBeatNM = ({ isDownbeatSound, dispatch }) => {
  const onClick = () => {
    dispatch({
      type: "setIsDownbeatSound",
      data: !isDownbeatSound,
    });
  };

  return (
    <FormControlLabel
      label="Клик на сильную долю"
      labelPlacement="end"
      control={
        <Switch
          checked={isDownbeatSound}
          onChange={onClick}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
const ButtonDownbeatSound = memo(ButtonDownBeatNM);
export default ButtonDownbeatSound;