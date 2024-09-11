import { FormControlLabel, Switch, Tooltip } from "@mui/material";

import { memo } from "react";

const ButtonBeatSoundNM = ({ isBeatSound, dispatch }) => {
  const onClick = () => {
    dispatch({ type: "setIsBeatSound", data: !isBeatSound });
  };
  return (
    <Tooltip title="Включить звук боя" placement="top">
      <FormControlLabel
        label="Бой"
        labelPlacement="end"
        control={
          <Switch
            checked={isBeatSound}
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
const ButtonBeatSound = memo(ButtonBeatSoundNM);
export default ButtonBeatSound;
