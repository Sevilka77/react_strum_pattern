import { useConfig } from "../useConfig";

import TempoSelector from "./TempoSelector";
import SettingsDialog from "./Settings";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect } from "react";
import { PlayIcon, SquareIcon } from "./Icons";
import * as Tone from "tone";

export default function ControlFooter() {
  const { config, dispatch } = useConfig();
  const handleClick = async () => {
    // Убедитесь, что Tone.js запущен
    await Tone.start();
    config.isPlaying ? Tone.getTransport().stop() : Tone.getTransport().start();

    dispatch({ type: "setIsPlay", data: !config.isPlaying });
  };
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
    <BottomNavigation
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        position: "fixed",
        bottom: 0,
      }}
    >
      <BottomNavigationAction
        value="play"
        onClick={handleClick}
        icon={config.isPlaying ? <SquareIcon /> : <PlayIcon />}
        sx={{ color: "#FFFFFF", width: "40px", minWidth: "40px", px: 0 }} // Отступы и размеры
      />
      <TempoSelector />
      <BottomNavigationAction
        value="settings"
        icon={<SettingsDialog />}
        sx={{ color: "#FFFFFF", width: "40px", minWidth: "40px", px: 0 }} // Отступы и размеры
      />
    </BottomNavigation>
  );
}
