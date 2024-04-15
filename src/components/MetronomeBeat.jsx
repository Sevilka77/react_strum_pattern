import { MoveDown, MoveUp } from "lucide-react"
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";


export default function MetronomeBeat({ id, beatStatus, active, onBeatStatusChanged }) {
  const clickHandler = () => {
    const newStatus = (beatStatus === "work" ? "rest" : "work");
    onBeatStatusChanged(newStatus);
  };
  const isUp = id % 2 !== 0
  let color = 'grey.600';
  if (active) {
    color = "error.main";
  }
  let height = 40
  let bgcolor = "grey.600"
  if (beatStatus == "work") {
    bgcolor = "primary.main"
    height = 120
  }
  if (beatStatus == "x") {
    bgcolor = "warning.main"
    height = 120
  }




  return (
    <Stack orientation="vertical" spacing={1}>
      <Button variant="contained" sx={{
        width: 20, height: height, borderRadius: 2, bgcolor: bgcolor
      }}
        onClick={clickHandler} >
        {
          isUp
            ? <MoveUp />
            : <MoveDown />
        }
      </Button >
      <Button sx={{ width: 20, height: 10, bgcolor: color }} />
    </Stack>
  );
}
