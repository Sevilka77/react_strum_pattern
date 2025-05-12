import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import { memo } from "react";
import { useChordSettings } from "@/entities/chordSettings/lib/useChordSettings";

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
        // sx={buttonStyles}
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClickMenu}
        sx={{
          minWidth: 32,
          width: 32,
          height: 32,
          p: 0,
          fontSize: 12,
          borderRadius: "50%",
          textTransform: "none",
        }}
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
