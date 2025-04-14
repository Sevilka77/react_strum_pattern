import { useState } from "react";
import { Menu, MenuItem, IconButton, ListItemIcon } from "@mui/material";
import { Backspace, ArrowsCounterClockwise } from "@phosphor-icons/react";
import {
  ArrowD,
  ArrowDB,
  ArrowDH,
  XDownIcon,
  XIcon,
} from "@/shared/ui/Icons/Icons";
import { memo } from "react";
import { useSequenceSettings } from "@/entities/sequenceSettings/lib/useSequenceSettings";

const PatternEditNM = ({ index }) => {
  const { sequenceSettings, dispatch } = useSequenceSettings();
  const { beatPattern } = sequenceSettings;
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const updateBeatInPattern = (newValue) => {
    const updatedPattern = beatPattern
      .split("") // Преобразуем строку в массив
      .map((char, i) => (i === index ? newValue : char)) // Изменяем нужный символ
      .join("");
    dispatch({ type: "SET_BEAT_PATTERN", payload: updatedPattern });
  };

  const deleteBeatByIndex = () => {
    if (index >= 0) {
      const updatedPattern = beatPattern
        .split("") // Преобразуем строку в массив символов
        .filter((_, i) => i !== index) // Удаляем элемент по индексу
        .join(""); // Преобразуем обратно в строку

      dispatch({ type: "SET_BEAT_PATTERN", payload: updatedPattern });
    }
  };
  const handleChange = (event) => {
    if (["A", "1", "0", "x", "c", "h", "b"].includes(event)) {
      updateBeatInPattern(event);
    } else if (event === "del") {
      deleteBeatByIndex();
    }
    handleCloseMenu();
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClickMenu}
        sx={{ borderRadius: "8px", border: "2px solid #4A434B", mt: 1 }}
      >
        <ArrowsCounterClockwise />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleChange("A")}>
          <ListItemIcon>
            <ArrowD color="warning" />
          </ListItemIcon>
          Акцент
        </MenuItem>
        <MenuItem onClick={() => handleChange("1")}>
          <ListItemIcon>
            <ArrowD color="primary" />
          </ListItemIcon>
          Удар
        </MenuItem>
        <MenuItem onClick={() => handleChange("c")}>
          <ListItemIcon>
            <XDownIcon color="primary" />
          </ListItemIcon>
          По заглушеным
        </MenuItem>
        <MenuItem onClick={() => handleChange("b")}>
          <ListItemIcon>
            <ArrowDB color="primary" />
          </ListItemIcon>
          По басам
        </MenuItem>
        <MenuItem onClick={() => handleChange("h")}>
          <ListItemIcon>
            <ArrowDH color="primary" />
          </ListItemIcon>
          По высоким
        </MenuItem>
        <MenuItem onClick={() => handleChange("x")}>
          <ListItemIcon>
            <XIcon color="primary" />
          </ListItemIcon>
          Заглушка
        </MenuItem>
        <MenuItem onClick={() => handleChange("0")}>
          <ListItemIcon>
            <ArrowD color="disabled" />
          </ListItemIcon>
          Пропуск
        </MenuItem>
        <MenuItem onClick={() => handleChange("del")}>
          <ListItemIcon>
            <Backspace />
          </ListItemIcon>
          Удалить
        </MenuItem>
      </Menu>
    </>
  );
};

const PatternEdit = memo(PatternEditNM);
export default PatternEdit;
