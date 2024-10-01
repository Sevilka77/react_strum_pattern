import { Box } from "@mui/material";
import React, { memo, useMemo } from "react";

const MetronomeBeatNM = ({ icon, active, fSize }) => {
  const iconStyles = useMemo(
    () => ({
      fill: active ? "currentColor" : "#ffffff0", // Цвет зависит от активности
    }),
    [active], // Изменяется только при изменении active
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 1,
          marginTop: "1vh",
          fontSize: fSize - 1 + "vw",
          paddingBottom: "15px",
        }}
      >
        {React.cloneElement(icon, { sx: iconStyles })}
      </Box>
    </>
  );
};

const MetronomeBeat = memo(MetronomeBeatNM);
export default MetronomeBeat;
