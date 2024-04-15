import { MoveDown, MoveUp } from "lucide-react"
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";


export default function MetronomeBeat({ id, beatStatus, active }) {
  //export default function MetronomeBeat({ id, beatStatus, active, onBeatStatusChanged }) {
  // const clickHandler = () => {
  //   const newStatus = (beatStatus === "1" ? "0" : "1");
  //   onBeatStatusChanged(newStatus);
  // };
  const isUp = id % 2 !== 0
  let color = 'grey.600';
  if (active) {
    color = "error.main";
  }
  let height = 40
  let bgcolor = "grey.600"
  if (beatStatus == "1") {
    height = 80
    isUp
      ? bgcolor = "#0336FF"
      : bgcolor = "#fdee03"

  }
  if (beatStatus == "A") {
    height = 110
    isUp
      ? bgcolor = "#0336FF"
      : bgcolor = "#fdee03"

  }
  if (beatStatus == "x") {
    bgcolor = "#ff0266"
    height = 80
  }




  return (
    <Stack orientation="vertical" spacing={1}>
      <Button variant="contained" sx={{
        width: 20, height: height, borderRadius: 2, bgcolor: bgcolor
      }}
      >
        {
          isUp
            ? <MoveUp />
            : <MoveDown />
        }
      </Button >
      <Button variant="contained" sx={{ width: 20, height: 40, bgcolor: color }}> {id} </Button>
    </Stack>
  );
}
