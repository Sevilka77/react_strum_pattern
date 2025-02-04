// features/metronome/ui/MetronomePlayButton.js
import { useEffect } from "react";
import { Button } from "@mui/material";
import { PlayIcon, SquareIcon } from "@/shared/ui/Icons/Icons";
import { useToneSettings } from "@/entities/toneSettings/lib/useToneSettings";
import * as Tone from "tone";
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
  }, [dispatch, toneSettings.isPlaying]);
  return (
    <Button
      sx={{
        width: "40px",
        minWidth: "40px",
        px: 0,
      }}
      value="play"
      onClick={handleClick}
    >
      {toneSettings.isPlaying ? <SquareIcon /> : <PlayIcon />}
    </Button>
  );
};

export default MetronomePlayButton;
