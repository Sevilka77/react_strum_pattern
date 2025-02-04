import * as React from "react";
import { SettingsIcon, XIcon } from "lucide-react";
import VolumeControl from "./VolumeControl";
import {
  Box,
  DialogTitle,
  IconButton,
  FormControlLabel,
  Switch,
  Divider,
  Select,
  MenuItem,
  Dialog,
} from "@mui/material";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import { useSoundSettings } from "@/entities/soundSettings/lib/useSoundSettings";

export default function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const { soundSettings, dispatch: soundDispatch } = useSoundSettings();
  const { toneSettings, dispatch: toneDispatch } = useToneSettings();

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
        <DialogTitle id="customized-dialog-title">Настройки</DialogTitle>
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
            alignSelf: "center",
            width: "90%",
            padding: 2,
          }}
        >
          <FormControlLabel
            label="Воспроизвести бой"
            labelPlacement="end"
            control={
              <Switch
                checked={soundSettings.isBeatSound}
                onChange={() =>
                  soundDispatch({
                    type: "setIsBeatSound",
                    data: !soundSettings.isBeatSound,
                  })
                }
                inputProps={{ "aria-label": "click-always" }}
              />
            }
          />
          <Divider />
          <FormControlLabel
            label="Метроном"
            labelPlacement="end"
            control={
              <Switch
                checked={soundSettings.isMetronomeSound}
                onChange={() =>
                  soundDispatch({
                    type: "setIsMetronomSound",
                    data: !soundSettings.isMetronomeSound,
                  })
                }
                inputProps={{ "aria-label": "click-always" }}
              />
            }
          />
          <FormControlLabel
            label="Кликаем на 1234"
            labelPlacement="end"
            control={
              <Switch
                checked={soundSettings.clickMainBeat}
                onChange={() =>
                  soundDispatch({
                    type: "setClickMainBeat",
                    data: !soundSettings.clickMainBeat,
                  })
                }
                inputProps={{ "aria-label": "click-main-beat" }}
              />
            }
          />
          <FormControlLabel
            label="Кликаем на И"
            labelPlacement="end"
            control={
              <Switch
                checked={soundSettings.clickSubbeat}
                onChange={() =>
                  soundDispatch({
                    type: "setClickSubbeat",
                    data: !soundSettings.clickSubbeat,
                  })
                }
                inputProps={{ "aria-label": "click-subbeat" }}
              />
            }
          />
          <FormControlLabel
            label="Выделяем '1'"
            labelPlacement="end"
            control={
              <Switch
                checked={soundSettings.clickTaktBeat}
                onChange={() =>
                  soundDispatch({
                    type: "setClickTaktBeat",
                    data: !soundSettings.clickTaktBeat,
                  })
                }
                inputProps={{ "aria-label": "click-takt-beat" }}
              />
            }
          />
          <FormControlLabel
            label="Отстучать бой"
            labelPlacement="end"
            control={
              <Switch
                checked={soundSettings.isHitSound}
                onChange={() =>
                  soundDispatch({
                    type: "setIsHitSound",
                    data: !soundSettings.isHitSound,
                  })
                }
                inputProps={{ "aria-label": "click-takt-beat" }}
              />
            }
          />{" "}
          <FormControlLabel
            label="Длительность нот"
            labelPlacement="end"
            control={
              <Select
                value={toneSettings.noteDuration}
                onChange={(event) =>
                  toneDispatch({
                    type: "SET_NOTE_DURATION", // Убедитесь, что это правильный тип действия
                    payload: event.target.value, // Передаем значение, полученное из события
                  })
                }
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"4n"}>4</MenuItem>
                <MenuItem value={"8n"}>8</MenuItem>
                <MenuItem value={"16n"}>16</MenuItem>
              </Select>
            }
          />{" "}
          <Divider sx={{ pt: 1 }} />
          <VolumeControl />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
