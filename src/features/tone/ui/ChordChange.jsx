import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import { memo } from "react";
import { useChordSettings } from "@/entities/chordSettings/lib/useChordSettings";

const buttonStyles = {
  width: "40px",
  minWidth: "40px",
  height: "40px",
  padding: 0,
  color: "#FFFFFF", // Белый текст
  backgroundColor: "#1976D2", // Синий фон (цвет primary из Material-UI)
  borderRadius: "8px", // Скругленные углы
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Тень
  "&:hover": {
    backgroundColor: "#1565C0", // Темно-синий при наведении
  },
  "&:active": {
    backgroundColor: "#0D47A1", // Еще темнее при нажатии
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ChordChangeNM = () => {
  const { chordSettings, dispatch } = useChordSettings();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const changeChord = (newValue) => {
    dispatch({ type: "setCurrentChord", payload: newValue });
  };

  const chords = ["G", "A", "C", "D", "E", "F", "Fm", "Am", "Dm", "Em", "Bm"];

  const handleChange = (chord) => {
    if (chords.includes(chord)) {
      changeChord(chord);
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
      <Button
        sx={buttonStyles}
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClickMenu}
      >
        {chordSettings.currentChord}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {chords.map((chord) => (
          <MenuItem key={chord} onClick={() => handleChange(chord)}>
            {chord}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const ChordChange = memo(ChordChangeNM);
export default ChordChange;
