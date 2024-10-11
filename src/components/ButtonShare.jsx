import Snackbar from "@mui/material/Snackbar";
import { ShareIcon } from "lucide-react";
import { Box, IconButton } from "@mui/material";
import { useState, memo } from "react";

async function copyToClip(url) {
  await navigator.clipboard.writeText(url);
}

const ButtonShareNM = ({ beatPattern }) => {
  const [open, setOpen] = useState(false);

  // Создаем URL для копирования
  const url = `${window.location.origin}/pattern/${beatPattern}`; // Используем динамическое получение origin

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
    <Box>
      <IconButton
        onClick={handleClick}
        color="inherit"
        sx={{
          fontSize: "40px",
          borderRadius: "50%",
        }}
        aria-label="Поделиться гитарным боем"
      >
        <ShareIcon />
      </IconButton>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Ссылка на гитарный бой скопирована!"
      />
    </Box>
  );
};

const ButtonShare = memo(ButtonShareNM);
export default ButtonShare;
