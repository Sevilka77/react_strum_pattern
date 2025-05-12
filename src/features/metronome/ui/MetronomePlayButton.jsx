// features/metronome/ui/MetronomePlayButton.js
import { useEffect } from "react";
import { IconButton } from "@mui/material";

import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import * as Tone from "tone";

import { Play, Pause } from "@phosphor-icons/react";

const MetronomePlayButton = () => {
  const { toneSettings, dispatch } = useToneSettings();

  const handleClick = async () => {
    // Запуск/остановка метронома
    await Tone.start();
    dispatch({ type: "SET_IS_PLAYING", payload: !toneSettings.isPlaying });
    if (toneSettings.isPlaying) {
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
    }
  };
  useEffect(() => {
    return () => {
      if (toneSettings.isPlaying) {
        dispatch({ type: "SET_IS_PLAYING", payload: false }); // Остановить воспроизведение
      }
    };
    а;
  }, [dispatch, toneSettings.isPlaying]);
  return (
    <IconButton
      sx={{
        borderRadius: "50%",
        bgcolor: "primary.main",
      }}
      value="play"
      onClick={handleClick}
    >
      {toneSettings.isPlaying ? <Pause size={36} /> : <Play size={36} />}
    </IconButton>
  );
};

export default MetronomePlayButton;
