
//import IncDec from "./IncDec";
//import Slider from '@mui/material/Slider';
//import * as React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';





export default function TimeSelect({ note, onNoteChanged }) {
  const handleChange = (event, newAlignment) => {
    onNoteChanged(newAlignment);
  };

  return (
    <ToggleButtonGroup

      exclusive
      value={note}
      onChange={handleChange}
      aria-label="text note"
    >
      <ToggleButton value="4" aria-label="4">
        4/4
      </ToggleButton>
      <ToggleButton value="2" aria-label="2">
        2/4
      </ToggleButton>
      <ToggleButton value="3" aria-label="3">
        3/4
      </ToggleButton>
    </ToggleButtonGroup>
  );
}




