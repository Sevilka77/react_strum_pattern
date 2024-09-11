import { memo } from "react";
import { FormControlLabel, Switch, Tooltip } from "@mui/material";

const BurronINM = ({ noteSize, dispatch }) => {
  const handleChange = () => {
    if (noteSize > 4) {
      dispatch({ type: "setNoteSize", data: noteSize / 2 });
    } else {
      dispatch({ type: "setNoteSize", data: noteSize * 2 });
    }
  };

  return (
    <Tooltip title="Изменить размер" placement="top">
      <FormControlLabel
        label='Счет через "И"'
        labelPlacement="end"
        control={
          <Switch
            checked={noteSize > 4}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            label="Счет"
            labelPlacement="end"
          />
        }
      />
    </Tooltip>
  );
};
const BurronI = memo(BurronINM);
export default BurronI;
