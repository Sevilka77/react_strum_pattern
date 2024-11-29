import { useState, useEffect } from "react";
import { memo } from "react";
import { useConfig } from "../hooks/useConfig";

import { Stack, Button, TextField } from "@mui/material";
import { Minus, Plus } from "lucide-react";

const TempoSelectorNM = () => {
  const { config, dispatch } = useConfig();
  const [value, setValue] = useState(config.tempo);
  let tapTimes = [];

  // Этот useEffect для отправки изменений в контекст
  useEffect(() => {
    if (value < 40) {
      setValue(40);
    } else if (value > 300) {
      setValue(300);
    }
    dispatch({ type: "setTempo", data: value });
  }, [value, dispatch]);

  useEffect(() => {
    setValue(config.tempo);
  }, [config.tempo]);

  const handleIncrease = () => {
    setValue((prevValue) => Math.min(prevValue + 10, 300)); // Увеличиваем на 10, но не выше 300
  };

  const handleDecrease = () => {
    setValue((prevValue) => Math.max(prevValue - 10, 40)); // Уменьшаем на 10, но не ниже 40
  };

  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    setValue(newValue); // Простой ввод без валидации на каждом символе
  };

  const handleBlur = () => {
    if (value < 40) {
      setValue(40);
    } else if (value > 300) {
      setValue(300);
    }
  };

  const handleTap = () => {
    const currentTime = Date.now() / 1000;
    tapTimes = [...tapTimes, currentTime];

    if (tapTimes.length > 1 && currentTime - tapTimes[0] > 2) {
      tapTimes.shift(); // Очищаем, если прошло слишком много времени
    }

    if (tapTimes.length > 1) {
      const intervals = tapTimes
        .slice(1)
        .map((time, index) => time - tapTimes[index]);
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const calculatedBpm = Math.round(60 / avgInterval);

      setValue(calculatedBpm);
    }
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
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

const TempoSelector = memo(TempoSelectorNM);
export default TempoSelector;
