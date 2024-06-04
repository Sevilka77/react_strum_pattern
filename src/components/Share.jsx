import Snackbar from "@mui/material/Snackbar";
import { ShareIcon } from "./Icons";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

async function copyToClip() {
  await navigator.clipboard.writeText(location.href);
}

export default function Share() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    copyToClip();
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
      <Tooltip title="Поделиться ссылкой на гитарный бой" placement="top">
        <IconButton
          sx={{
            color: "text.primary",
            fontSize: "40px",
            borderRadius: "50%",
            border: "1px solid #f5f5f5",
          }}
          value="chplayeck"
          onClick={handleClick}
        >
          <ShareIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Ссылка на гитарйный бой скопирована!"
      />
    </Box>
  );
}
