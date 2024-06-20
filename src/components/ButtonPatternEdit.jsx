import { IconButton, Tooltip } from "@mui/material";
import { EditIcon } from "./Icons";

const ButtonPatternEdit = ({ onChanged }) => {
  return (
    <Tooltip title="Редактировать бой" placement="top">
      <IconButton
        value="check"
        onClick={() => {
          onChanged();
        }}
        sx={{
          color: "text.primary",
          fontSize: "40px",
          borderRadius: "50%",
        }}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default ButtonPatternEdit;
