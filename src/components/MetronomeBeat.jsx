import { Stack, Box } from "@mui/material";
import { ArrowD, ArrowU, XDownIcon, XUpIcon, XIcon } from "./Icons";

export default function MetronomeBeat({
  id,
  beatStatus,
  active,
  isSmd,
  noteSize,
  beatsLen,
}) {
  const isUp = id % 2 !== 0;
  let nameId = isUp ? "и" : (id + 2) / 2;
  let color = id % noteSize === 0 ? "warning.main" : "primary.main";
  let icon;
  let aColor = active ? "#ed6c02" : "#ffffff0";
  let bColor = active ? "currentColor" : "#ffffff0";
  let fSize = isSmd ? (beatsLen !== 0 ? Math.min(18, 94 / beatsLen) : 0) : 6;

  switch (beatStatus) {
    case "0":
      icon = isUp ? (
        <ArrowU fontSize="inherit" color="disabled" sx={{ fill: bColor }} />
      ) : (
        <ArrowD fontSize="inherit" color="disabled" sx={{ fill: bColor }} />
      );
      break;
    case "1":
      icon = isUp ? (
        <ArrowU fontSize="inherit" color="primary" sx={{ fill: bColor }} />
      ) : (
        <ArrowD fontSize="inherit" color="primary" sx={{ fill: bColor }} />
      );
      break;
    case "A":
      icon = isUp ? (
        <ArrowU fontSize="inherit" color="warning" sx={{ fill: bColor }} />
      ) : (
        <ArrowD fontSize="inherit" color="warning" sx={{ fill: bColor }} />
      );
      break;
    case "x":
      icon = <XIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />;
      break;
    case "c":
      icon = isUp ? (
        <XUpIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />
      ) : (
        <XDownIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />
      );
      break;
  }

  return (
    <Stack
      orientation="vertical"
      sx={{
        width: "auto",
        fontSize: fSize + "vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: "-2vh",
          color: color,
        }}
      >
        {nameId}
      </Box>
      <Box sx={{ height: "1vh", bgcolor: aColor, marginBottom: "1vh" }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 1,
        }}
      >
        {icon}
      </Box>
    </Stack>
  );
}
