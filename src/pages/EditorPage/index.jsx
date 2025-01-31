import { lazy, Suspense, useEffect } from "react";
import { PlusIcon, MinusIcon, Share2Icon } from "lucide-react";
import { Container, IconButton, Snackbar, Stack } from "@mui/material";
import Header from "@/features/header";
import ControlFooter from "@/components/ControlFooter";
import LDJson from "@/components/LDJson";
import useEditor from "./lib/useEditor";
import { learnPatterns } from "@/app/providers/learnPatterns";
import useConfig from "../../hooks/useConfig";

const MetronomeWrapper = lazy(() => import("@/components/MetronomeWrapper"));

function EditorPage() {
  const { handleChange, handleClose, open, updateBeatPattern } = useEditor();
  const { dispatch } = useConfig();

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

  // Инициализация редактора
  useEffect(() => {
    dispatch({ type: "setEditMode", data: true });
    const firstPattern = learnPatterns[0];
    if (firstPattern) {
      updateBeatPattern(firstPattern.pattern);
      dispatch({ type: "setNoteDuration", data: firstPattern.note });
      dispatch({ type: "setTempo", data: firstPattern.temp });
    }

    return () => {
      dispatch({ type: "setEditMode", data: false });
    };
  }, []);

  return (
    <>
      <LDJson data={ldData} />
      <Header title={"Редактор боя"} />
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
