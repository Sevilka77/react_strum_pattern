import { Typography } from "@mui/material";

import React, { memo, useMemo } from "react";

const MetronomeBeatNM = ({ icon, active }) => {
  const iconStyles = useMemo(
    () => ({
      fill: active ? "currentColor" : "#ffffff0",
      fontSize: "inherit",
    }),
    [active],
  );

  return (
    <Typography
      variant="h1"
      component="p"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {React.cloneElement(icon, { sx: iconStyles })}
    </Typography>
  );
};

const MetronomeBeatIcon = memo(MetronomeBeatNM);
export default MetronomeBeatIcon;
