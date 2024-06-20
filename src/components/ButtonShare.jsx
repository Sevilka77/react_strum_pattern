import Snackbar from "@mui/material/Snackbar";
import { ShareIcon } from "./Icons";
import { Box, IconButton, Tooltip } from "@mui/material";
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
      <Tooltip title="Поделиться ссылкой на гитарный бой" placement="top">
        <IconButton
          sx={{
            color: "text.primary",
            fontSize: "40px",
            borderRadius: "50%",
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
};
const ButtonShare = memo(ButtonShareNM);
export default ButtonShare;
