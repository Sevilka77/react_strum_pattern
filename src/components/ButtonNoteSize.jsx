import { memo, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";

const ButtonNoteSizeNM = ({ noteSize, dispatch }) => {
  const [size, setSize] = useState("4/4");
  const handleChange = () => {
    if (noteSize === 4) {
      setSize("3/4");
      dispatch({ type: "setNoteSize", data: 3 });
    } else if (noteSize === 3) {
      setSize("2/4");
      dispatch({ type: "setNoteSize", data: 2 });
    } else if (noteSize === 2) {
      setSize("8/8");
      dispatch({ type: "setNoteSize", data: 8 });
    } else if (noteSize === 8) {
      setSize("6/8");
      dispatch({ type: "setNoteSize", data: 6 });
    } else if (noteSize === 6) {
      setSize("4/4");
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
        {size}
      </IconButton>
    </Tooltip>
  );
};
const ButtonNoteSize = memo(ButtonNoteSizeNM);
export default ButtonNoteSize;
