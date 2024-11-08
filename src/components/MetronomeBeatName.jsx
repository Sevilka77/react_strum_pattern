import { Typography } from "@mui/material";

export default function MetronomeBeatName({ id, noteDuration }) {
  let nameId;
  let color;

  // Определяем цвет только для основных счетов
  if (noteDuration === "4n") {
    // Для четвертных нот просто выводим id + 1
    nameId = id + 1;
    color = "warning.main"; // Основной счет всегда выделен
  } else if (noteDuration === "8n") {
    // Для восьмых нот используем шаблон "1 и 2 и"
    nameId = id % 2 === 0 ? Math.floor(id / 2) + 1 : "и"; // Четные индексы — это счета
    color = id % 2 === 0 ? "warning.main" : "#FFFFFF"; // Основной счет — цвет "warning.main"
  } else if (noteDuration === "16n") {
    // Для шестнадцатых нот чередуем "1 та и та"
    const positionInCycle = id % 4; // Определяем позицию внутри 4-ударного цикла
    if (positionInCycle === 0) {
      nameId = Math.floor(id / 4) + 1; // Основной счет: 1, 2, 3 и т.д.
      color = "warning.main"; // Основной счет выделяем
    } else if (positionInCycle === 1 || positionInCycle === 2) {
      nameId = positionInCycle === 1 ? "та" : "и"; // Слог "та" и "и"
      color = "#FFFFFF"; // Обычный цвет для "та" и "и"
    } else {
      nameId = "та"; // Последняя "та"
      color = "#FFFFFF"; // Обычный цвет
    }
  } else {
    // Дефолтное поведение
    nameId = id + 1;
    color = "warning.main"; // Основной счет выделяем
  }

  return (
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
        color: color,
      }}
    >
      {nameId}
    </Typography>
  );
}
