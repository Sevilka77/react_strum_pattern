import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardButton = styled(Button)({
  backgroundColor: "rgb(55,65,81)",
  width: "100%",
  textTransform: "uppercase",
  borderRadius: "4px",
  color: "#FFF",
  "&:hover": {
    backgroundColor: "rgb(75,85,99)",
  },
});

export default CardButton;
