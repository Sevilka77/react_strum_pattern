import { lazy, Suspense, useEffect } from "react";
import { Plus, Minus, Export } from "@phosphor-icons/react";
import { Container, IconButton, Snackbar, Stack, Box } from "@mui/material";
import Header from "@/features/header";
import ControlFooter from "@/features/metronome/ui/ControlFooter";
import LDJson from "@/components/LDJson";
import useEditor from "./lib/useEditor";
import { learnPatterns } from "@/app/providers/learnPatterns";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import { useEditMode } from "@/entities/editMode/lib/useEditMode";

const MetronomeWrapper = lazy(() =>
  import("@/widgets/metronomePlayer").then((module) => ({
    default: module.MetronomePlayer,
  }))
);
function EditorPage() {
  const { handleChange, handleClose, open, updateBeatPattern } = useEditor();
  const { dispatch: toneDispatch } = useToneSettings();
  const { dispatch } = useEditMode();

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
    dispatch({ type: "SET_EDIT_MODE", payload: true });
    const firstPattern = learnPatterns[0];
    if (firstPattern) {
      updateBeatPattern(firstPattern.pattern);
      toneDispatch({ type: "SET_NOTE_DURATION", payload: firstPattern.note });
      toneDispatch({ type: "SET_TEMPO", payload: firstPattern.temp });
    }

    return () => {
      dispatch({ type: "SET_EDIT_MODE", payload: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LDJson data={ldData} />
      <Header title={"Редактор боя"} />
      <Container
        component="main"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Suspense fallback={<div>Загрузка...</div>}>
            <MetronomeWrapper />
          </Suspense>
          <Stack>
            <IconButton
              onClick={() => handleChange("plus")}
              sx={{ borderRadius: "8px", border: "2px solid #4A434B", mt: 1 }}
            >
              <Plus />
            </IconButton>
            <IconButton
              onClick={() => handleChange("minus")}
              sx={{ borderRadius: "8px", border: "2px solid #4A434B", mt: 1 }}
            >
              <Minus />
            </IconButton>
            <IconButton
              onClick={() => handleChange("share")}
              sx={{ borderRadius: "8px", border: "2px solid #4A434B", mt: 1 }}
            >
              <Export />
            </IconButton>
          </Stack>
        </Box>
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
