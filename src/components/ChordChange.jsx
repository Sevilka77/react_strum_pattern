import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import { memo } from "react";
import useConfigSelector from "../hooks/useConfigSelector";

const ChordChangeNM = () => {
  const [currentChord, dispatch] = useConfigSelector(
    (config) => config.currentChord,
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const changeChord = (newValue) => {
    dispatch({ type: "setCurrentChord", data: newValue });
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
        sx={{
          color: "#FFFFFF",
          width: "40px",
          minWidth: "40px",
          px: 0,
        }}
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClickMenu}
      >
        {currentChord}
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
