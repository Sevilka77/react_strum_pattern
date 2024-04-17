
//import IncDec from "./IncDec";
//import Slider from '@mui/material/Slider';
import { Slider, Box } from '@mui/material';



export default function TempoSelector({ tempo, onTempoChanged }) {
  const handleChange = (event) => {
    let value = +event.target.value;

    onTempoChanged(value);
  };

  return (

    <Box sx={{ width: 1 / 3 }}>
      <Slider
        aria-label="Tempo"
        value={tempo}
        // getAriaValueText={(e) => console.log(e)}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={40}
        max={220}
        onChange={handleChange}
      />
    </Box>


  );
}




