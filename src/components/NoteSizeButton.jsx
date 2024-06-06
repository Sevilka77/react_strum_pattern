import { IconButton, Tooltip } from "@mui/material";

export default function NoteSizeButton({ config, onConfigChanged }) {
  const handleChange = () => {
    if (config.noteSize == "4") {
      onConfigChanged("setNoteSize", 3);
    }
    if (config.noteSize == "3") {
      onConfigChanged("setNoteSize", 2);
    }
    if (config.noteSize == "2") {
      onConfigChanged("setNoteSize", 4);
    }
  };
  return (
    <Tooltip title="Изменить размер" placement="top">
      <IconButton
        sx={{
          color: "text.primary",
          fontSize: "40px",
          borderRadius: "50%",
          border: "1px solid#f5f5f5",
        }}
        onClick={handleChange}
      >
        {config.noteSize + "/4"}
      </IconButton>
    </Tooltip>
  );
}
