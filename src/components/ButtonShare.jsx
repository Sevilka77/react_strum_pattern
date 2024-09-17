import Snackbar from "@mui/material/Snackbar";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import { memo } from "react";

async function copyToClip(url) {
  await navigator.clipboard.writeText(url);
}

const ButtonShareNM = ({ beatPattern }) => {
  const [open, setOpen] = useState(false);

  const url = `${location.href}?p=${beatPattern}`;
  const handleClick = () => {
    copyToClip(url);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box sx={{ gridArea: "SB" }}>
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
        value="chplayeck"
        onClick={handleClick}
      >
        Сохранить
      </Button>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Ссылка на гитарйный бой скопирована!"
      />
    </Box>
  );
};
const ButtonShare = memo(ButtonShareNM);
export default ButtonShare;
