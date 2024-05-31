import { IconButton } from "@mui/material";

export default function NoteSizeButton({ config, onConfigChanged }) {
  const handleChange = () => {
    if (config.note == "4") {
      onConfigChanged("setNoteSize", 3);
    }
    if (config.note == "3") {
      onConfigChanged("setNoteSize", 2);
    }
    if (config.note == "2") {
      onConfigChanged("setNoteSize", 4);
    }
  };
  return (
    <IconButton
      sx={{
        color: "text.primary",
        fontSize: "40px",
        borderRadius: "50%",
        border: "1px solid#f5f5f5",
      }}
      onClick={handleChange}
    >
      {config.note + "/4"}
    </IconButton>
  );
}
