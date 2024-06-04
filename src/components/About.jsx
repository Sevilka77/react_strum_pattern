import * as React from "react";
import IconButton from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import { HelpCircle } from "lucide-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function About() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClickOpen}
        color="inherit"
        sx={{
          fontSize: "40px",
          borderRadius: "50%",
          border: "1px solid#f5f5f5",
        }}
      >
        <HelpCircle />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton variant="outlined" onClick={handleClose} />

        <Container>
          <Typography variant="h3" gutterBottom>
            Тренажёр гитарного боя.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Это тренажёр гитарного боя. Здесь показаны движения руки стрелками
            вверх и вниз.
          </Typography>
        </Container>
      </Dialog>
    </React.Fragment>
  );
}
