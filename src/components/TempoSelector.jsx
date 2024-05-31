import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';


const Input = styled(MuiInput)`
  width: 42px;
`;

export default function TempoSelector({ tempo, onTempoChanged }) {
  const [value, setValue] = useState(tempo);
  useEffect(() => {
    onTempoChanged(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);

  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 40) {
      setValue(40);

    } else if (value > 300) {
      setValue(300);
      onTempoChanged(300);
    }
  };

  return (
    <Box >

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography id="input-slider" >
            Tempo
          </Typography>
        </Grid>
        <Grid item xs>
          <Slider
            min={40}
            max={300}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 40,
              max: 300,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}





