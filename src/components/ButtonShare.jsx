import Snackbar from "@mui/material/Snackbar";
import { ShareIcon } from "lucide-react";

import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { memo } from "react";

async function copyToClip(url) {
  await navigator.clipboard.writeText(url);
}

const ButtonShareNM = ({ beatPattern, isSmallDevice }) => {
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
    <Box>
      {!isSmallDevice ? (
        <Button
          color="inherit"
          sx={{
            borderRadius: "8px",
          }}
          value="chplayeck"
          onClick={handleClick}
        >
          Сохранить
        </Button>
      ) : (
        <IconButton
          value="chplayeck"
          onClick={handleClick}
          color="inherit"
          sx={{
            fontSize: "40px",
            borderRadius: "50%",
          }}
        >
          <ShareIcon />
        </IconButton>
      )}

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Ссылка на гитарйный бой скопирована!"
      />
    </Box>
  );
};
const ButtonShare = memo(ButtonShareNM);
export default ButtonShare;
