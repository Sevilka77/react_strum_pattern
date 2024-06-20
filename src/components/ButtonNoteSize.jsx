import { memo } from "react";
import { IconButton, Tooltip } from "@mui/material";

const ButtonNoteSizeNM = ({ noteSize, dispatch }) => {
  const handleChange = () => {
    if (noteSize === 4) {
      dispatch({ type: "setNoteSize", data: 3 });
    } else if (noteSize === 3) {
      dispatch({ type: "setNoteSize", data: 2 });
    } else if (noteSize === 2) {
      dispatch({ type: "setNoteSize", data: 4 });
    }
  };

  return (
    <Tooltip title="Изменить размер" placement="top">
      <IconButton
        sx={{
          color: "text.primary",
          fontSize: "40px",
          borderRadius: "50%",
        }}
        onClick={handleChange}
      >
        {noteSize + "/4"}
      </IconButton>
    </Tooltip>
  );
};
const ButtonNoteSize = memo(ButtonNoteSizeNM);
export default ButtonNoteSize;
