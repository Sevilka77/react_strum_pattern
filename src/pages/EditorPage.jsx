import Header from "../components/Header";
import { lazy, Suspense, useState } from "react";
import { PlusIcon, MinusIcon, Share2Icon } from "lucide-react";

const MetronomeWrapper = lazy(() => import("../components/MetronomeWrapper"));

import { useConfig } from "../hooks/useConfig";
import { useEffect } from "react";
import ControlFooter from "../components/ControlFooter";
import { learnPatterns } from "../app/providers/learnPatterns";

import { Container, IconButton, Snackbar, Stack } from "@mui/material";
import LDJson from "../components/LDJson";

function EditorPage() {
  const { config, dispatch } = useConfig();
  const [open, setOpen] = useState(false);
  const pattern = config.beatPattern;
  const url = `${window.location.origin}/pattern/${config.beatPattern}`;
  const ldData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Редактор гитарного боя",
    operatingSystem: "Все платформы",
    applicationCategory: "Музыкальный инструмент",
    url: "https://strumming.ru/create",
    description:
      "Создайте свой собственный гитарный бой с помощью редактора на Strumming.ru.",
  };

  useEffect(() => {
    dispatch({ type: "setEditMode", data: true });
    const firstPattern = learnPatterns[0];
    if (firstPattern) {
      dispatch({ type: "setBeatPattern", data: firstPattern.pattern });
      dispatch({ type: "setNoteDuration", data: firstPattern.note });
      dispatch({ type: "setTempo", data: firstPattern.temp });
    }

    return () => {
      dispatch({ type: "setEditMode", data: false });
      dispatch({ type: "clearPattern" });
    };
  }, [dispatch]);

  const copyToClip = async (url) => {
    await navigator.clipboard.writeText(url);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const modifyBeatPattern = (event) => {
    let updatedPattern = pattern.split(""); // Преобразуем строку в массив символов

    if (event === "plus") {
      updatedPattern = updatedPattern.concat("0"); // Добавляем новый символ в конец
    } else if (event === "minus") {
      updatedPattern = updatedPattern.slice(0, -1); // Удаляем последний символ
    }

    // Обновляем конфиг через dispatch
    dispatch({ type: "setBeatPattern", data: updatedPattern.join("") });
  };
  const handleChange = (event) => {
    if (event === "plus" || event === "minus") {
      modifyBeatPattern(event); // Изменяем паттерн
    } else if (event === "share") {
      copyToClip(url); // Копируем ссылку
      setOpen(true); // Показываем snackbar
    }
  };

  return (
    <>
      <LDJson data={ldData} />
      <Header title={"Рекдактор боя"} />
      <Container
        component="main"
        sx={{
          display: "flex",
          minHeight: "80dvh",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="xl"
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <MetronomeWrapper />
        </Suspense>
        <Stack>
          <IconButton
            onClick={() => handleChange("plus")}
            sx={{ borderRadius: "8px", border: "2px solid #4A434B", mt: 1 }}
          >
            <PlusIcon />
          </IconButton>
          <IconButton
            onClick={() => handleChange("minus")}
            sx={{ borderRadius: "8px", border: "2px solid #4A434B", mt: 1 }}
          >
            <MinusIcon />
          </IconButton>
          <IconButton
            onClick={() => handleChange("share")}
            sx={{ borderRadius: "8px", border: "2px solid #4A434B", mt: 1 }}
          >
            <Share2Icon />
          </IconButton>
        </Stack>
        <ControlFooter />
      </Container>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Ссылка на гитарный бой скопирована!"
      />
    </>
  );
}

export default EditorPage;
