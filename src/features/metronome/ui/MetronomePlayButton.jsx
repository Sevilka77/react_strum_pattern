// features/metronome/ui/MetronomePlayButton.js
import { useEffect } from "react";
import { Button } from "@mui/material";
import { PlayIcon, SquareIcon } from "@/shared/ui/Icons/Icons";
import useConfigSelector from "@/hooks/useConfigSelector";
import * as Tone from "tone";
const MetronomePlayButton = () => {
  const [isPlaying, dispatch] = useConfigSelector((config) => config.isPlaying);

  const handleClick = async () => {
    // Запуск/остановка метронома
    await Tone.start();
    dispatch({ type: "setIsPlay", data: !isPlaying });
    if (isPlaying) {
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
    }
  };
  useEffect(() => {
    return () => {
      if (isPlaying) {
        dispatch({ type: "setIsPlay", data: false }); // Остановить воспроизведение
      }
    };
  }, [dispatch, isPlaying]);
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
      {isPlaying ? <SquareIcon /> : <PlayIcon />}
    </Button>
  );
};

export default MetronomePlayButton;
