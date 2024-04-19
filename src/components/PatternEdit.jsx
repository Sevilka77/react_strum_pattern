
import { useState, useEffect } from "react";
import Fade from '@mui/material/Fade';
import { Button, ButtonGroup, } from "@mui/material";
import { DeleteIcon } from "lucide-react";


export default function PatternEdit({ beatPattern, onPatternChanged }) {
  const [checked, setChecked] = useState(false);
  const [beats, setBeats] = useState(beatPattern);
  const handleChange = (event) => {
    if (event === "A") { beats.push('A') }
    if (event === "1") { beats.push('1') }
    if (event === "0") { beats.push('0') }
    if (event === "x") { beats.push('x') }
    if (event === "del") { if (beats.length > 0) beats.pop() }
    console.log(beats);
    onPatternChanged(beats.join(''))
  }
  useEffect(() => {
    setBeats(beatPattern.slice(""))
  }, [beatPattern])

  return (
    <>
      <Button
        value="check"
        selected={checked}
        onClick={() => {
          setChecked(!checked);
        }}
      >
        Редактировать бой
      </Button>

      <Fade in={checked}>
        <ButtonGroup aria-label="Basic button group" sx={{
          display: 'flex',
          justifyContent: "center",
          flexWrap: 'wrap'

        }}>

          <Button onClick={() => handleChange("A")}>Aкцент</Button>
          <Button onClick={() => handleChange("1")}>Удар</Button>
          <Button onClick={() => handleChange("0")}>Пропуск</Button>
          <Button onClick={() => handleChange("x")}>Заглушка</Button>
          <Button onClick={() => handleChange("del")} ><DeleteIcon /></Button>

        </ButtonGroup>
      </Fade>

    </ >
  )
}
