import { useConfigSelector } from "../hooks/useConfigSelector";

import TempoSelector from "./TempoSelector";
import SettingsDialog from "./Settings";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { memo, useEffect } from "react";
import { PlayIcon, SquareIcon } from "./Icons";
import * as Tone from "tone";
import ChordChange from "./ChordChange";

const ControlFooterNM = ({ children }) => {
  const [isPlaying, dispatch] = useConfigSelector((config) => config.isPlaying);
  const handleClick = async () => {
    // Убедитесь, что Tone.js запущен
    await Tone.start();
    isPlaying ? Tone.getTransport().stop() : Tone.getTransport().start();

    dispatch({ type: "setIsPlay", data: !isPlaying });
  };
  useEffect(() => {
    // Очистка состояния при размонтировании компонента
    return () => {
      // Остановить воспроизведение при размонтировании
      if (isPlaying) {
        dispatch({ type: "setIsPlay", data: false }); // Остановить воспроизведение
      }
    };
  }, [dispatch, isPlaying]);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column", // Расставляем кнопки по строкам
            justifyContent: "center",
            marginBottom: "8px", // Отступ перед нижней строкой
          }}
        >
          {children}
        </Box>
      )}

      <BottomNavigation
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <BottomNavigationAction
          value="play"
          onClick={handleClick}
          icon={isPlaying ? <SquareIcon /> : <PlayIcon />}
          sx={{ color: "#FFFFFF", width: "40px", minWidth: "40px", px: 0 }}
        />
        <TempoSelector />
        <BottomNavigationAction
          value="settings"
          icon={<ChordChange />}
          sx={{ color: "#FFFFFF", width: "40px", minWidth: "40px", px: 0 }}
        />
        <BottomNavigationAction
          value="settings"
          icon={<SettingsDialog />}
          sx={{ color: "#FFFFFF", width: "40px", minWidth: "40px", px: 0 }}
        />
      </BottomNavigation>
    </Box>
  );
};
const ControlFooter = memo(ControlFooterNM);
export default ControlFooter;
