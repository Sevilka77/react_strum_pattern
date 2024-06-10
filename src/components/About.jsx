import * as React from "react";
import IconButton from "@mui/material/Button";
import { Box, Container, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import { HelpCircleIcon, XCircleIcon } from "lucide-react";

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
    <>
      <IconButton
        onClick={handleClickOpen}
        color="inherit"
        sx={{
          minWidth: 0,
          fontSize: "40px",
          borderRadius: "50%",
          border: "1px solid#f5f5f5",
        }}
      >
        <HelpCircleIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            onClick={handleClose}
            color="inherit"
            sx={{
              fontSize: "40px",
              borderRadius: "50%",
              border: "1px solid#f5f5f5",
            }}
          >
            <XCircleIcon />
          </IconButton>
        </Box>
        <Container>
          <Typography variant="h3">Тренажёр гитарного боя.</Typography>
          <Typography variant="h5">
            <br />
            <br />
            Добро пожаловать на сайт тренажера гитарного боя! Мы создали это
            удобное онлайн-приложение, чтобы помочь вам прокачать свои навыки
            игры на гитаре. С помощью стрелочек, имитирующих движения вашей
            руки, вы сможете повторять и практиковать различные гитарные приемы,
            создавая свои уникальные музыкальные рисунки.
            <br />
            <br />
            Этот тренажер предлагает вам интерактивный подход к изучению гитары,
            а также развитие чувства ритма и координации движений. Независимо от
            вашего уровня подготовки, вы сможете найти упражнения, подходящие
            именно вам.
            <br />
            <br />
            Мы ценим ваш выбор в пользу нашего тренажера и надеемся, что он
            станет вашим надежным помощником в мире музыки. Начните прямо сейчас
            и почувствуйте вдохновение! Благодарим вас за доверие и желаем
            приятного обучения!
          </Typography>
        </Container>
      </Dialog>
    </>
  );
}
