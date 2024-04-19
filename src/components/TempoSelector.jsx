
//import IncDec from "./IncDec";
//import Slider from '@mui/material/Slider';
import { Slider, Box } from '@mui/material';



export default function TempoSelector({ tempo, onTempoChanged }) {
  const handleChange = (event) => {
    let value = +event.target.value;

    onTempoChanged(value);
  };

  return (

    <Box sx={{

      display: 'flex',
      flexDirection: "column",
      justifyContent: "center",

      width: 1 / 3

    }}>
      <p style={{ textAlign: "center" }}>BPM:{tempo}</p>
      <Slider
        aria-label="Tempo"
        value={tempo}
        // getAriaValueText={(e) => console.log(e)}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={60}
        max={300}
        onChange={handleChange}
      />
    </Box >


  );
}




