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
          aria-label="Редактировать гитарный бой"
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
          aria-label="Редактировать гитарный бой"
        >
          Редактировать
        </Button>
      )}
    </>
  );
};

const ButtonPatternEdit = memo(ButtonPatternEditNM);
export default ButtonPatternEdit;
