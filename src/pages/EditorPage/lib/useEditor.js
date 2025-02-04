import { useState } from "react";

import { useSequenceSettings } from "@/entities/sequenceSettings/lib/useSequenceSettings";

const useEditor = () => {
  const { sequenceSettings, dispatch } = useSequenceSettings();
  const { beatPattern } = sequenceSettings;
  const [open, setOpen] = useState(false);
  const updateBeatPattern = (updatedPattern) => {
    dispatch({ type: "SET_BEAT_PATTERN", payload: updatedPattern });
  };
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
    try {
      await navigator.clipboard.writeText(url); // Пытаемся записать в буфер обмена
      console.log("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL to clipboard", err); // Обработка ошибки
    }
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
};
export default useEditor;
