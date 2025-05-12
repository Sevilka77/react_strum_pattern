// features/tone/ui/MetronomeSoundButton.js
import { Checkbox } from "@mui/material";
import { HandsClapping } from "@phosphor-icons/react";

import { useSoundSettings } from "@/entities/soundSettings/lib/useSoundSettings";

const HitSoundButton = () => {
  const { soundSettings, dispatch } = useSoundSettings();

  const handleClick = () => {
    dispatch({
      type: "setIsHitSound",
      data: !soundSettings.isHitSound,
    });
  };
  return (
    <Checkbox
      checked={soundSettings.isHitSound}
      onChange={handleClick}
      sx={{
        backgroundColor: "transparent",
        "&.Mui-checked": {
          color: "text.primary",
          backgroundColor: "primary.main",
        },
      }}
      icon={<HandsClapping size={16} />}
      checkedIcon={<HandsClapping size={16} />}
    ></Checkbox>
  );
};

export default HitSoundButton;
