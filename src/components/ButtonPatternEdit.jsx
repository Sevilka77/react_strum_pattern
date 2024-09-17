import { Button, IconButton } from "@mui/material";
import { PencilIcon } from "lucide-react";
import { memo } from "react";

const ButtonPatternEditNM = ({ onChanged, isSmallDevice }) => {
  return (
    <>
      {isSmallDevice ? (
        <IconButton
          color="inherit"
          value="check"
          onClick={() => {
            onChanged();
          }}
          sx={{
            fontSize: "40px",
            borderRadius: "50%",
          }}
        >
          <PencilIcon />
        </IconButton>
      ) : (
        <Button
          color="inherit"
          value="check"
          onClick={() => {
            onChanged();
          }}
          sx={{
            borderRadius: "8px",
          }}
        >
          Редактировать
        </Button>
      )}
    </>
  );
};

const ButtonPatternEdit = memo(ButtonPatternEditNM);
export default ButtonPatternEdit;
