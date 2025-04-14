// features/tone/ui/GuitarSoundButtonr.js

import { Checkbox, IconButton } from "@mui/material";
import { Guitar } from "@phosphor-icons/react";

import { useSoundSettings } from "@/entities/soundSettings/lib/useSoundSettings";

const GuitarSoundButton = () => {
  const { soundSettings, dispatch } = useSoundSettings();

  const handleClick = () => {
    dispatch({
      type: "setIsBeatSound",
      data: !soundSettings.isBeatSound,
    });
  };
  return (
    <Checkbox
      checked={soundSettings.isBeatSound}
      onChange={handleClick}
      sx={{
        backgroundColor: "transparent",
        "&.Mui-checked": {
          color: "text.primary",
          backgroundColor: "primary.main",
        },
      }}
      icon={<Guitar size={40} />}
      checkedIcon={<Guitar size={40} />}
    ></Checkbox>
  );
};

export default GuitarSoundButton;
