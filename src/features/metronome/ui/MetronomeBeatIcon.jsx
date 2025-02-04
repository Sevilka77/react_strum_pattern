import { Typography } from "@mui/material";

import React, { memo } from "react";
import { useCycleSettings } from "@/entities/cycleSettings/lib/useCycleSettings";

const MetronomeBeatNM = ({ id, icon }) => {
  const { cycleSettings } = useCycleSettings();
  return (
    <Typography
      variant="h1"
      component="p"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {React.cloneElement(icon, {
        sx: {
          fill: cycleSettings.activeBeat === id ? "currentColor" : "#ffffff0",
          fontSize: "inherit",
        },
      })}
    </Typography>
  );
};
const MetronomeBeatIcon = memo(MetronomeBeatNM, (prev, next) => {
  return prev.icon === next.icon && prev.active === next.active;
});

// const MetronomeBeatIcon = memo(MetronomeBeatNM);
export default MetronomeBeatIcon;
