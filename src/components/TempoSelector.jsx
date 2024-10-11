import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { memo } from "react";

const Input = styled(MuiInput)`
  width: 42px;
`;

const TempoSelectorNM = ({ tempo, dispatch }) => {
  const [value, setValue] = useState(tempo);

  // Этот useEffect для отправки изменений в контекст
  useEffect(() => {
    dispatch({ type: "setTempo", data: value });
  }, [value, dispatch]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 40) {
      setValue(40);
    } else if (value > 500) {
      setValue(500);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography id="input-slider">BPM</Typography>
      </Grid>
      <Grid item xs>
        <Slider
          min={40}
          max={500}
          value={typeof value === "number" ? value : 0}
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
            max: 500,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Grid>
    </Grid>
  );
};
const TempoSelector = memo(TempoSelectorNM);
export default TempoSelector;
