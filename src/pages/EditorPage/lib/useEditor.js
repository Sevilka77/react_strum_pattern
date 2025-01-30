import { useState } from "react";

import { useBeatPattern } from "@/hooks/useBeatPattern";

export function useEditor() {
  const { beatPattern, updateBeatPattern } = useBeatPattern();
  const [open, setOpen] = useState(false);

  const url = `${window.location.origin}/pattern/${beatPattern}`;

  const modifyBeatPattern = (event) => {
    let updatedPattern = beatPattern.split(""); // Преобразуем строку в массив символов
    if (event === "plus") {
      updatedPattern = updatedPattern.concat("0"); // Добавляем новый символ в конец
    } else if (event === "minus") {
      updatedPattern = updatedPattern.slice(0, -1); // Удаляем последний символ
    }

    updateBeatPattern(updatedPattern.join(""));
  };

  const copyToClip = async (url) => {
    await navigator.clipboard.writeText(url);
  };

  const handleChange = (event) => {
    if (event === "plus" || event === "minus") {
      modifyBeatPattern(event); // Изменяем паттерн
    } else if (event === "share") {
      copyToClip(url); // Копируем ссылку
      setOpen(true); // Показываем snackbar
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return {
    handleChange,
    handleClose,
    open,
    updateBeatPattern,
  };
}
