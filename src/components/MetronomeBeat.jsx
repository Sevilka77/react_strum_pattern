import { MoveDown, MoveUp } from "lucide-react"
import IconButton from '@mui/material/IconButton';

export default function MetronomeBeat({ id, beatStatus, active, onBeatStatusChanged }) {
  const clickHandler = () => {
    const newStatus = (beatStatus === "work" ? "rest" : "work");
    onBeatStatusChanged(newStatus);
  };
  const isUp = id % 2 !== 0
  let color = '';
  if (active) {
    color = "error.main";
  }
  let status = beatStatus == "work";
  let bgcolor
  if (status) {
    bgcolor = "primary.main"
  }



  return (
    <IconButton sx={{ minWidth: 0, bgcolor: bgcolor, color: color }}
      onClick={clickHandler}>
      {
        isUp
          ? <MoveUp />
          : <MoveDown />
      }

    </IconButton >
  );
}
