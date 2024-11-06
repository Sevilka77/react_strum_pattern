import { useState, useEffect } from "react";
import { memo } from "react";
import { useConfig } from "../useConfig";
import { styled } from "@mui/system";
import { Grid, Typography, Slider, Input as MuiInput } from "@mui/material";

const Input = styled(MuiInput)`
  width: 42px;
`;

const TempoSelectorNM = () => {
  const { config, dispatch } = useConfig();
  const [value, setValue] = useState(config.tempo);

  // Этот useEffect для отправки изменений в контекст
  useEffect(() => {
    dispatch({ type: "setTempo", data: value });
  }, [value, dispatch]);

  useEffect(() => {
    setValue(config.tempo);
  }, [config.tempo]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 40) {
      setValue(40);
    } else if (value > 300) {
      setValue(300);
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
          max={300}
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
            max: 300,
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
