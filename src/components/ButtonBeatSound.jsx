import { FormControlLabel, Switch } from "@mui/material";

import { memo } from "react";

const ButtonBeatSoundNM = ({ isBeatSound, dispatch }) => {
  const onClick = () => {
    dispatch({ type: "setIsBeatSound", data: !isBeatSound });
  };
  return (
    <FormControlLabel
      label="Бой"
      labelPlacement="end"
      control={
        <Switch
          checked={isBeatSound}
          onChange={onClick}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
const ButtonBeatSound = memo(ButtonBeatSoundNM);
export default ButtonBeatSound;
