
import IncDec from "./IncDec";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';



export default function TempoSelector({ tempo, onTempoChanged }) {
  const handleChange = (event) => {
    let value = +event.target.value;

    onTempoChanged(value);
  };

  return (
    <>
      <div className="mb-4">
        <IncDec
          label={"" + tempo}
          onDec={() => onTempoChanged(tempo - 1)}
          onInc={() => onTempoChanged(tempo + 1)}
        />
      </div>
      <Box sx={{ width: 1 / 2 }}>
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

    </>
  );
}




