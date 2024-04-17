import { MoveDown, MoveUp, X } from "lucide-react"

import { Stack, Box } from "@mui/material";


export default function MetronomeBeat({ id, beatStatus, active }) {
  //export default function MetronomeBeat({ id, beatStatus, active, onBeatStatusChanged }) {
  // const clickHandler = () => {
  //   const newStatus = (beatStatus === "1" ? "0" : "1");
  //   onBeatStatusChanged(newStatus);
  // };
  const isUp = id % 2 !== 0
  let nameId
  if (isUp) {
    nameId = "и"
  } else {
    nameId = (id + 2) / 2
  }

  let color = '#C6C6C6';
  let icon
  if (active) {
    color = "error.main";
  }
  let height = 40
  let bgcolor = "#C6C6C6"
  if (beatStatus == "0") {
    height = 40
    if (isUp) {
      icon = <MoveUp />
    } else {
      icon = <MoveDown />
    }

  }

  if (beatStatus == "1") {
    height = 80
    if (isUp) {
      bgcolor = "#4088F4",
        icon = <MoveUp />
    } else {
      bgcolor = "#46B4A7",
        icon = <MoveDown />
    }

  }
  if (beatStatus == "A") {
    height = 110
    if (isUp) {
      bgcolor = "#4088F4",
        icon = <MoveUp />
    } else {
      bgcolor = "#46B4A7",
        icon = <MoveDown />
    }

  }
  if (beatStatus == "x") {
    bgcolor = "#FD4C5E"
    height = 80
    icon = <X />
  }




  return (
    <Stack orientation="vertical" sx={{ width: "auto" }} >
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: height, borderRadius: 1, bgcolor: bgcolor, border: "1px solid #fff"
      }}
      >
        {icon
        }


      </Box>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: 40, bgcolor: color, borderRadius: 1, border: "1px solid #fff"
      }}> {nameId} </Box>
    </ Stack>
  );
}
