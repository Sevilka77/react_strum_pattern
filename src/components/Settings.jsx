import * as React from "react";

import Dialog from "@mui/material/Dialog";

import { SettingsIcon, XIcon } from "lucide-react";
import { Box, DialogTitle, IconButton } from "@mui/material";

import ButtonMetronomeSound from "./ButtonMetronomeSound.jsx";
import ButtonDownbeatSound from "./ButtonDownbeatSound.jsx";
import ButtonBeatSound from "./ButtonBeatSound";

import ButtonNoteSize from "./ButtonNoteSize.jsx";

import ButtonI from "./ButtonI.jsx";

import ButtonUpbeatSound from "./ButtonUpbeatSound.jsx";
import ButtonAcsentbeatSound from "./ButtonAcsentbeatSound.jsx";
import { useConfig } from "../useConfig";
export default function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const { config, dispatch } = useConfig();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <span onClick={handleClickOpen}>
        <SettingsIcon />
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {" "}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Настройки
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <XIcon />
        </IconButton>
        <Box
          sx={{
            width: 250,
            padding: 2,
            borderRadius: "6px",
            boxShadow:
              "0 3px 4px 0 rgba(0,0,0,.16),0 1px 7px 0 rgba(0,0,0,.12)",
          }}
        >
          <ButtonMetronomeSound
            isMetronomeSound={config.isMetronomeSound}
            dispatch={dispatch}
          />
          {config.isMetronomeSound && (
            <ButtonAcsentbeatSound
              isAcsentbeatSound={config.isAcsentbeatSound}
              dispatch={dispatch}
            />
          )}
          <ButtonBeatSound
            isBeatSound={config.isBeatSound}
            dispatch={dispatch}
          />
          <ButtonI noteSize={config.noteSize} dispatch={dispatch} />
          <ButtonNoteSize noteSize={config.noteSize} dispatch={dispatch} />
          {config.noteSize > 4 && config.isMetronomeSound && (
            <>
              <ButtonDownbeatSound
                isDownbeatSound={config.isDownbeatSound}
                dispatch={dispatch}
              />
              <ButtonUpbeatSound
                isUpbeatSound={config.isUpbeatSound}
                dispatch={dispatch}
              />
            </>
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
