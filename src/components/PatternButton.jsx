import { IconButton } from "@mui/material";
import { EditIcon } from "./Icons";

export default function PatternButton({ onChanged }) {
  return (
    <IconButton
      value="check"
      onClick={() => {
        onChanged();
      }}
      sx={{
        color: "text.primary",
        fontSize: "40px",
        borderRadius: "50%",
        border: "1px solid#f5f5f5",
      }}
    >
      <EditIcon fontSize="inherit" />
    </IconButton>
  );
}
