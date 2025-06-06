// features/tone/ui/MetronomeSoundButton.js
import { Checkbox } from "@mui/material";
import { Metronome } from "@phosphor-icons/react";

import { useSoundSettings } from "@/entities/soundSettings/lib/useSoundSettings";

const MetronomeSoundButton = () => {
  const { soundSettings, dispatch } = useSoundSettings();

  const handleClick = () => {
    dispatch({
      type: "setIsMetronomeSound",
      data: !soundSettings.isMetronomeSound,
    });
  };
  return (
    <Checkbox
      checked={soundSettings.isMetronomeSound}
      onChange={handleClick}
      sx={{
        backgroundColor: "transparent",
        "&.Mui-checked": {
          color: "text.primary",
          backgroundColor: "primary.main",
        },
      }}
      icon={<Metronome size={16} />}
      checkedIcon={<Metronome size={16} />}
    ></Checkbox>
  );
};

export default MetronomeSoundButton;
