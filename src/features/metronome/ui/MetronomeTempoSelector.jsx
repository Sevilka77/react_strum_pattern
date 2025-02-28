import { useEffect, useState } from "react";

import { Stack, Button, TextField } from "@mui/material";
import useTapTempo from "../lib/useTapTempo";
import { Minus, Plus } from "lucide-react";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
const buttonStyles = {
  minWidth: "40px",
  height: "40px",
  padding: 0,
  color: "#FFFFFF", // Белый текст
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const MetronomeTempoSelector = () => {
  const { toneSettings, dispatch } = useToneSettings();
  const [value, setValue] = useState(toneSettings.tempo);

  useEffect(() => {
    setValue(toneSettings.tempo);
  }, [toneSettings.tempo]);

  // Обработчик увеличения темпа
  const handleIncrease = () => {
    const newValue = Math.min(value + 10, 300);
    setValue(newValue);
    dispatch({ type: "SET_TEMPO", payload: newValue });
  };

  // Обработчик уменьшения темпа
  const handleDecrease = () => {
    const newValue = Math.max(value - 10, 40);
    setValue(newValue);
    dispatch({ type: "SET_TEMPO", payload: newValue });
  };

  // Обработчик изменения значения в поле ввода
  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    dispatch({ type: "SET_TEMPO", payload: newValue });
  };
  const handleTempoChange = (newValue) => {
    setValue(newValue);
    dispatch({ type: "SET_TEMPO", payload: newValue });
  };
  const handleTap = useTapTempo(handleTempoChange);

  const handleBlur = () => {
    const clampedValue = Math.min(Math.max(value, 40), 300);
    if (clampedValue !== value) {
      setValue(clampedValue);
      dispatch({ type: "SET_TEMPO", payload: clampedValue });
    }
  };

  return (
    <Stack
      spacing={1}
      direction="row"
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <Button sx={buttonStyles} onClick={handleDecrease} color="primary">
        <Minus />
      </Button>
      <TextField
        variant="standard"
        value={value}
        onChange={handleInputChange}
        size="small"
        sx={{ width: "10%", border: 0 }}
        onBlur={handleBlur} // Проверка значения при выходе из поля
      />{" "}
      <Button sx={buttonStyles} onClick={handleIncrease} color="primary">
        <Plus />
      </Button>
      <Button sx={buttonStyles} onClick={handleTap} color="primary">
        TAP
      </Button>
    </Stack>
  );
};

export default MetronomeTempoSelector;
