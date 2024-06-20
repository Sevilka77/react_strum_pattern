import { useState } from "react";

import { Button, Stack } from "@mui/material";
import { DeleteIcon } from "lucide-react";
import { ArrowD, XDownIcon, XIcon } from "./Icons";
import { useConfig } from "../useConfig";

const PatternEdit = () => {
  const { config, dispatch } = useConfig();
  const [beats] = useState(config.beatPattern.split(""));

  const handleChange = (event) => {
    if (event === "A") {
      beats.push("A");
    }
    if (event === "1") {
      beats.push("1");
    }
    if (event === "0") {
      beats.push("0");
    }
    if (event === "x") {
      beats.push("x");
    }
    if (event === "c") {
      beats.push("c");
    }
    if (event === "del") {
      if (beats.length > 0) beats.pop();
    }

    dispatch({ type: "setBeatPattern", data: beats.join("") });
  };

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center">
      <Button
        sx={{
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("A")}
      >
        <ArrowD color="warning" />
        Aкцент
      </Button>

      <Button
        sx={{
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("1")}
      >
        <ArrowD color="warning.main" />
        Удар
      </Button>

      <Button
        sx={{
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("c")}
      >
        <XDownIcon />
        Удар по заглушенным
      </Button>

      <Button
        sx={{
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("x")}
      >
        <XIcon />
        Заглушка
      </Button>

      <Button
        sx={{
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("0")}
      >
        <ArrowD color="disabled" />
        Пропуск
      </Button>

      <Button
        sx={{
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("del")}
      >
        <DeleteIcon />
        Удалить
      </Button>
    </Stack>
  );
};
export default PatternEdit;
