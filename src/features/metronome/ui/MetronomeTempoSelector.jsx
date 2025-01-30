import { useState } from "react";
import { useConfigSelector } from "@/hooks/useConfigSelector";
import { Stack, Button, TextField } from "@mui/material";
import { useTapTempo } from "../lib/useTapTempo";
import { Minus, Plus } from "lucide-react";

const MetronomeTempoSelector = () => {
  const [tempo, dispatch] = useConfigSelector((config) => config.tempo);
  const [value, setValue] = useState(tempo);

  // Обработчик увеличения темпа
  const handleIncrease = () => {
    const newValue = Math.min(value + 10, 300);
    setValue(newValue);
    dispatch({ type: "setTempo", data: newValue });
  };

  // Обработчик уменьшения темпа
  const handleDecrease = () => {
    const newValue = Math.max(value - 10, 40);
    setValue(newValue);
    dispatch({ type: "setTempo", data: newValue });
  };

  // Обработчик изменения значения в поле ввода
  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    dispatch({ type: "setTempo", data: newValue });
  };
  const handleTempoChange = (newValue) => {
    setValue(newValue);
    dispatch({ type: "setTempo", data: newValue });
  };
  const handleTap = useTapTempo(handleTempoChange);

  const handleBlur = () => {
    const clampedValue = Math.min(Math.max(value, 40), 300);
    if (clampedValue !== value) {
      setValue(clampedValue);
      dispatch({ type: "setTempo", data: clampedValue });
    }
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <Button
        sx={{ color: "#FFFFFF", width: "40px", minWidth: "40px", px: 0 }}
        onClick={handleDecrease}
        color="primary"
      >
        <Minus />
      </Button>

      <TextField
        value={value}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        sx={{ width: "60px" }}
        onBlur={handleBlur} // Проверка значения при выходе из поля
      />
      <Button
        sx={{ color: "#FFFFFF", width: "40px", minWidth: "40px", px: 0 }}
        onClick={handleTap}
        color="primary"
      >
        TAP
      </Button>
      <Button
        sx={{ color: "#FFFFFF", width: "40px", minWidth: "40px", px: 0 }}
        onClick={handleIncrease}
        color="primary"
      >
        <Plus />
      </Button>
    </Stack>
  );
};

export default MetronomeTempoSelector;
