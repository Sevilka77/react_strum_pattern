import { useConfig } from "../useConfig";
import ButtonPlayStop from "./ButtonPlayStop";
import TempoSelector from "./TempoSelector";
import SettingsDialog from "./Settings";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect } from "react";

export default function ControlFooter() {
  const { config, dispatch } = useConfig();
  useEffect(() => {
    // Очистка состояния при размонтировании компонента
    return () => {
      // Остановить воспроизведение при размонтировании
      if (config.isPlaying) {
        dispatch({ type: "setIsPlay", data: false }); // Остановить воспроизведение
      }
    };
  }, [dispatch, config.isPlaying]);
  return (
    // <Paper
    //   elevation={4}
    //   sx={{ width: "100%", position: "fixed", bottom: 0, left: 0, right: 0 }}
    // >
    <BottomNavigation
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }} // Чтобы разместить элементы по краям
    >
      <BottomNavigationAction
        value="play"
        icon={
          <ButtonPlayStop isPlaying={config.isPlaying} dispatch={dispatch} />
        }
        sx={{ maxWidth: "30px", px: 0 }} // Отступы и размеры
      />
      <TempoSelector />
      <BottomNavigationAction
        value="settings"
        icon={<SettingsDialog />}
        sx={{ color: "#FFFFFF", maxWidth: "30px", px: 0 }} // Отступы и размеры
      />
    </BottomNavigation>
  );
}
