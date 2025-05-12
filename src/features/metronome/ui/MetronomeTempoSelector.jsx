import { useEffect, useState } from "react";

import { Stack, Button, TextField, IconButton } from "@mui/material";
import useTapTempo from "../lib/useTapTempo";
import { Minus, Plus, HandTap } from "@phosphor-icons/react";
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
      <IconButton
        sx={{
          borderRadius: "50%",
        }}
        value="minus"
        onClick={handleDecrease}
      >
        <Minus size={16} />
      </IconButton>
      <TextField
        variant="standard"
        value={value}
        onChange={handleInputChange}
        size="large"
        sx={{ width: "10%", border: 0 }}
        onBlur={handleBlur}
        InputProps={{
          disableUnderline: true,
          sx: {
            textAlign: "center",
            input: {
              textAlign: "center",
            },
          },
        }} // Проверка значения при выходе из поля
      />{" "}
      <IconButton
        sx={{
          borderRadius: "50%",
        }}
        value="plus"
        onClick={handleIncrease}
      >
        <Plus size={16} />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: "50%",
        }}
        value="tap"
        onClick={handleTap}
      >
        <HandTap size={32} />
      </IconButton>
    </Stack>
  );
};

export default MetronomeTempoSelector;
