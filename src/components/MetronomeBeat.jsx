import { Stack, Box } from "@mui/material";
import { ArrowD, ArrowU, XDownIcon, XUpIcon, XIcon } from "./Icons";

export default function MetronomeBeat({ id, beatStatus, active, note }) {
  const isUp = id % 2 !== 0;
  let nameId;

  if (isUp) {
    nameId = "e";
  } else {
    nameId = (id + 2) / 2;
  }

  let color = "primary.main";
  let icon;
  if (id % note === 0) {
    color = "warning.main";
  }
  let bColor = "#ffffff0";
  let aColor = "#ffffff0";
  if (active) {
    bColor = "currentColor";
    aColor = "#ed6c02";
  }

  if (beatStatus == "0") {
    if (isUp) {
      icon = (
        <ArrowU fontSize="inherit" color="disabled" sx={{ fill: bColor }} />
      );
    } else {
      icon = (
        <ArrowD fontSize="inherit" color="disabled" sx={{ fill: bColor }} />
      );
    }
  }

  if (beatStatus == "1") {
    if (isUp) {
      icon = (
        <ArrowU fontSize="inherit" color="primary" sx={{ fill: bColor }} />
      );
    } else {
      icon = (
        <ArrowD fontSize="inherit" color="primary" sx={{ fill: bColor }} />
      );
    }
  }
  if (beatStatus == "A") {
    if (isUp) {
      icon = (
        <ArrowU fontSize="inherit" color="warning" sx={{ fill: bColor }} />
      );
    } else {
      icon = (
        <ArrowD fontSize="inherit" color="warning" sx={{ fill: bColor }} />
      );
    }
  }
  if (beatStatus == "x") {
    if (isUp) {
      icon = <XIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />;
    } else {
      icon = <XIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />;
    }
  }
  if (beatStatus == "c") {
    if (isUp) {
      icon = (
        <XUpIcon
          fontSize="inherit"
          color="primary"
          sx={{ fill: bColor, fontSize: 120 }}
        />
      );
    } else {
      icon = (
        <XDownIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />
      );
    }
  }

  return (
    <Stack
      orientation="vertical"
      sx={{
        width: "auto",
        fontSize: "6vw",
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
        {" "}
        {nameId}{" "}
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
