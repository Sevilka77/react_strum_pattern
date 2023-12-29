"use client";
import { MoveDown, MoveUp } from "lucide-react"
import Button from '@mui/material/Button';

export default function MetronomeBeat({ id, beatStatus, active, onBeatStatusChanged }) {
  const clickHandler = () => {
    const newStatus = (beatStatus === "work" ? "rest" : "work");
    onBeatStatusChanged(newStatus);
  };
  const isUp = id % 2 !== 0
  let color = '';
  if (active) {
    color = '#c71111';
  }
  let status = beatStatus == "rest";
  let variant
  status ? variant = "outlined" : variant = "contained"

  return (
    <Button variant={variant} sx={{ p: 2 }} style={{ color: color }}
      onClick={clickHandler}>
      {
        isUp
          ? <MoveUp />
          : <MoveDown />
      }

    </Button >
  );
}
