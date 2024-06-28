import { Box } from "@mui/material";

export default function MetronomeBeatName({ id, fSize, noteSize }) {
  const isUp = id % 2 !== 0;
  let nameId = isUp ? "и" : (id + 2) / 2;
  let color = id % noteSize === 0 ? "warning.main" : "primary.main";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        fontSize: fSize + "vw",
        color: color,
      }}
    >
      {nameId}
    </Box>
  );
}
