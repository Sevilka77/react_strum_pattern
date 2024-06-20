import { IconButton, Tooltip } from "@mui/material";
import { useConfig } from "../useConfig";

const NoteSizeButton = () => {
  const { config, dispatch } = useConfig();
  const handleChange = () => {
    if (config.noteSize == "4") {
      dispatch({ type: "setNoteSize", data: 3 });
    }
    if (config.noteSize == "3") {
      dispatch({ type: "setNoteSize", data: 2 });
    }
    if (config.noteSize == "2") {
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
        {config.noteSize + "/4"}
      </IconButton>
    </Tooltip>
  );
};

export default NoteSizeButton;
