import { lazy, Suspense, useEffect } from "react";
import { Plus, Minus, Export } from "@phosphor-icons/react";
import { Container, IconButton, Snackbar, Stack, Box } from "@mui/material";
import TopBarLoader from "@/shared/ui/TopBarLoader";
import Header from "@/features/header";
import ControlFooter from "@/features/metronome/ui/ControlFooter";

import useEditor from "./lib/useEditor";
import { learnPatterns } from "@/app/providers/learnPatterns";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import { useEditMode } from "@/entities/editMode/lib/useEditMode";
import MetaData from "@/shared/lib/seo/MetaData";

const MetronomeWrapper = lazy(() =>
  import("@/widgets/metronomePlayer").then((module) => ({
    default: module.MetronomePlayer,
  }))
);
function EditorPage() {
  const { handleChange, handleClose, open, updateBeatPattern } = useEditor();
  const { dispatch: toneDispatch } = useToneSettings();
  const { dispatch } = useEditMode();

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
      <MetaData
        title="Создайте свой собственный гитарный бой — Strumming.ru"
        description="Используйте редактор Strumming.ru для создания уникальных гитарных боев. Тренируйтесь и делитесь своими ритмами с другими музыкантами, улучшайте свою технику!"
      />

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
          <Suspense fallback={<TopBarLoader />}>
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
