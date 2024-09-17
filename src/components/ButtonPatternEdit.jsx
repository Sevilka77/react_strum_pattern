import { Button, Tooltip } from "@mui/material";

import { memo } from "react";

const ButtonPatternEditNM = ({ onChanged }) => {
  return (
    <Tooltip title="Редактировать бой" placement="top">
      <Button
        value="check"
        onClick={() => {
          onChanged();
        }}
        sx={{
          borderRadius: "8px",
          bgcolor: "background.paper",
          flexDirection: "column", // Устанавливаем направление элементов в столбец
          height: "100%", // Занимает всю доступную высоту ячейки Grid
          display: "flex", // Устанавливаем flex, чтобы кнопка растягивалась
          alignItems: "center", // Выравниваем по центру по вертикали
          justifyContent: "center", // Выравниваем по центру по горизонтали
        }}
      >
        Рекдактировать
      </Button>
    </Tooltip>
  );
};
const ButtonPatternEdit = memo(ButtonPatternEditNM);
export default ButtonPatternEdit;
