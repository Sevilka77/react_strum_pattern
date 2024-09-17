import { memo } from "react";
import { FormControlLabel, Switch } from "@mui/material";

const BurronINM = ({ noteSize, dispatch }) => {
  const handleChange = () => {
    if (noteSize > 4) {
      dispatch({ type: "setNoteSize", data: noteSize / 2 });
    } else {
      dispatch({ type: "setNoteSize", data: noteSize * 2 });
    }
  };

  return (
    <FormControlLabel
      label='Счет через "И"'
      labelPlacement="end"
      control={
        <Switch
          checked={noteSize > 4}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
const BurronI = memo(BurronINM);
export default BurronI;
