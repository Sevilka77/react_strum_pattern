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

import useConfig from "@/hooks/useConfig";

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
                checked={config.isBeatSound}
                onChange={() =>
                  dispatch({
                    type: "setIsBeatSound",
                    data: !config.isBeatSound,
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
                checked={config.isMetronomeSound}
                onChange={() =>
                  dispatch({
                    type: "setIsMetronomSound",
                    data: !config.isMetronomeSound,
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
                checked={config.clickMainBeat}
                onChange={() =>
                  dispatch({
                    type: "setClickMainBeat",
                    data: !config.clickMainBeat,
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
                checked={config.clickSubbeat}
                onChange={() =>
                  dispatch({
                    type: "setClickSubbeat",
                    data: !config.clickSubbeat,
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
                checked={config.clickTaktBeat}
                onChange={() =>
                  dispatch({
                    type: "setClickTaktBeat",
                    data: !config.clickTaktBeat,
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
                checked={config.isHitSound}
                onChange={() =>
                  dispatch({
                    type: "setIsHitSound",
                    data: !config.isHitSound,
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
                value={config.noteDuration}
                onChange={(event) =>
                  dispatch({
                    type: "setNoteDuration", // Убедитесь, что это правильный тип действия
                    data: event.target.value, // Передаем значение, полученное из события
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
