import { memo } from "react";
import { FormControlLabel, Switch } from "@mui/material";

const ButtonNoteSizeNM = ({ noteSize, dispatch }) => {
  const handleChange = () => {
    switch (noteSize) {
      case 3:
        dispatch({ type: "setNoteSize", data: 4 });
        break;
      case 4:
        dispatch({ type: "setNoteSize", data: 3 });
        break;
      case 6:
        dispatch({ type: "setNoteSize", data: 8 });
        break;
      case 8:
        dispatch({ type: "setNoteSize", data: 6 });
        break;
    }
  };

  return (
    <FormControlLabel
      label='Счет до "3"'
      labelPlacement="end"
      control={
        <Switch
          checked={noteSize % 3 == 0}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
const ButtonNoteSize = memo(ButtonNoteSizeNM);
export default ButtonNoteSize;
