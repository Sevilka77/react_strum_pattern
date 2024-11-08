import { Typography } from "@mui/material";
import React, { memo, useMemo } from "react";

const MetronomeBeatNM = ({ icon, active }) => {
  const iconStyles = useMemo(
    () => ({
      fill: active ? "currentColor" : "#ffffff0",
      fontSize: "inherit",
    }),
    [active], // Изменяется только при изменении active
  );

  return (
    <Typography variant="h2" sx={{ display: "flex", alignItems: "center" }}>
      {React.cloneElement(icon, { sx: iconStyles })}
    </Typography>
  );
};

const MetronomeBeat = memo(MetronomeBeatNM);
export default MetronomeBeat;
