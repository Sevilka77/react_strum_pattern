import { useState } from "react";

import { Button, Stack } from "@mui/material";
import { DeleteIcon } from "lucide-react";
import { ArrowD, XDownIcon, XIcon } from "./Icons";
import { memo } from "react";
import ButtonShare from "./ButtonShare";

const PatternEditNM = ({ beatPattern, dispatch }) => {
  const [beats] = useState(beatPattern.split(""));

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
    console.log(beatPattern);
  };

  return (
    <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center">
      <Button
        sx={{
          borderRadius: "8px",
          bgcolor: "background.paper",
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("A")}
      >
        <ArrowD color="warning" />
      </Button>

      <Button
        sx={{
          borderRadius: "8px",
          bgcolor: "background.paper",
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("1")}
      >
        <ArrowD color="warning.main" />
      </Button>

      <Button
        sx={{
          borderRadius: "8px",
          bgcolor: "background.paper",
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("c")}
      >
        <XDownIcon />
      </Button>

      <Button
        sx={{
          flexDirection: "column", //
          borderRadius: "8px",
          bgcolor: "background.paper",
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("x")}
      >
        <XIcon />
      </Button>

      <Button
        sx={{
          borderRadius: "8px",
          bgcolor: "background.paper",
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("0")}
      >
        <ArrowD color="disabled" />
      </Button>

      <Button
        sx={{
          borderRadius: "8px",
          bgcolor: "background.paper",
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("del")}
      >
        <DeleteIcon />
      </Button>
      <Button
        sx={{
          borderRadius: "8px",
          bgcolor: "background.paper",
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
        onClick={() => handleChange("del")}
      >
        <ButtonShare beatPattern={beatPattern} />
      </Button>
    </Stack>
  );
};

const PatternEdit = memo(PatternEditNM);
export default PatternEdit;
