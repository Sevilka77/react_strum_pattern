import { Box } from "@mui/material";
import { ArrowD, ArrowU, XDownIcon, XUpIcon, XIcon } from "./Icons";

export default function MetronomeBeat({ id, beatStatus, active, fSize }) {
  const isUp = id % 2 !== 0;
  let icon;
  let bColor = active ? "currentColor" : "#ffffff0";

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
        {icon}
      </Box>
    </>
  );
}
