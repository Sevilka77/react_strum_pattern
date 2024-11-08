import { useState, useEffect } from "react";
import { memo } from "react";
import { useConfig } from "../useConfig";
import { styled } from "@mui/system";
import { Typography, Slider, Input as MuiInput, Stack } from "@mui/material";

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
    <Stack
      spacing={2}
      direction="row"
      sx={{ alignItems: "center", width: "100%" }}
    >
      <Typography variant="h5" id="input-slider">
        BPM
      </Typography>

      <Slider
        min={40}
        max={300}
        color="#FFFFFF"
        value={typeof value === "number" ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
      />
      <Typography variant="h5" id="temp-slider">
        <Input
          id="temp-input"
          sx={{
            fontSize: "inherit",
            color: "inherit",
          }}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 10,
            min: 40,
            max: 300,
            type: "number",
            "aria-labelledby": "temp-slider",
          }}
        />
      </Typography>
    </Stack>
  );
};
const TempoSelector = memo(TempoSelectorNM);
export default TempoSelector;
