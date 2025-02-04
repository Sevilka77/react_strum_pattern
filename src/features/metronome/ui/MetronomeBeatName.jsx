import { Typography } from "@mui/material";

const getBeatNameAndColor = (id, noteDuration) => {
  let nameId;
  let color;
  const positionInCycle = id % 4;
  switch (noteDuration) {
    case "4n":
      nameId = id + 1;
      color = "#ffa726"; // Основной счет всегда выделен
      break;

    case "8n":
      nameId = id % 2 === 0 ? Math.floor(id / 2) + 1 : "и";
      color = id % 2 === 0 ? "#ffa726" : "#FFFFFF";
      break;

    case "16n":
      switch (positionInCycle) {
        case 0:
          nameId = Math.floor(id / 4) + 1;
          color = "#ffa726"; // Основной счет выделяем
          break;
        case 1:
        case 2:
          nameId = positionInCycle === 1 ? "та" : "и";
          color = "#FFFFFF";
          break;
        default:
          nameId = "та";
          color = "#FFFFFF";
      }
      break;

    default:
      nameId = id + 1;
      color = "warning.main";
  }

  return { nameId, color };
};

export default function MetronomeBeatName({ id, noteDuration }) {
  const { nameId, color } = getBeatNameAndColor(id, noteDuration);

  return (
    <Typography
      variant="h4"
      component="p"
      sx={{
        textAlign: "center",
        color: color,
        textShadow: `0 0 42px ${color}`,
      }}
    >
      {nameId}
    </Typography>
  );
}
