import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Snackbar,
} from "@mui/material";
import { DeleteIcon, ShareIcon } from "lucide-react";
import { ArrowD, ArrowDB, ArrowDH, XDownIcon, XIcon } from "./Icons";
import { memo } from "react";

const PatternEditNM = ({ beatPattern, dispatch }) => {
  const [beats, setBeats] = useState(beatPattern.split(""));
  const [open, setOpen] = useState(false);
  const url = `${window.location.origin}/#/pattern/${beatPattern}`;

  const copyToClip = async (url) => {
    await navigator.clipboard.writeText(url);
  };

  const handleClick = () => {
    copyToClip(url);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    const newBeats = [...beats]; // Создаем новый массив для обновления состояния
    if (["A", "1", "0", "x", "c", "h", "b"].includes(event)) {
      newBeats.push(event);
    } else if (event === "del") {
      if (newBeats.length > 0) newBeats.pop();
    }

    setBeats(newBeats); // Обновляем состояние beats
    dispatch({ type: "setBeatPattern", data: newBeats.join("") });
  };

  return (
    <>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 56,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignContent: "flex-end",
          flexWrap: "wrap",
          height: "auto",
        }} // Чтобы разместить элементы по краям
      >
        <BottomNavigationAction
          onClick={() => handleChange("A")}
          value="disable"
          icon={<ArrowD color="warning" />}
          sx={{ flex: "1 1 auto", p: 2 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("1")}
          value="disable"
          icon={<ArrowD color="primary" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("c")}
          value="disable"
          icon={<XDownIcon color="primary" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("b")}
          value="disable"
          icon={<ArrowDB color="primary" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("h")}
          value="disable"
          icon={<ArrowDH color="primary" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("x")}
          value="disable"
          icon={<XIcon color="primary" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("0")}
          value="disable"
          icon={<ArrowD color="disabled" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("del")}
          value="delete"
          icon={<DeleteIcon />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          value="settings"
          onClick={handleClick} // Исправлено: добавлены скобки
          icon={<ShareIcon />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
      </BottomNavigation>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Ссылка на гитарный бой скопирована!"
      />
    </>
  );
};

const PatternEdit = memo(PatternEditNM);
export default PatternEdit;
