import { Box } from "@mui/material";

export default function MetronomeBeatName({ id, fSize, noteSize }) {
  const isUp = id % 2 !== 0;
  let nameId;
  if (noteSize > 5) {
    nameId = isUp ? "и" : (id % noteSize) / 2 + 1;
  } else {
    nameId = (id % noteSize) + 1;
  }

  let color = id % noteSize === 0 ? "warning.main" : "text.primary";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        fontSize: fSize / 2 + "vw",
        color: color,
      }}
    >
      {nameId}
    </Box>
  );
}
