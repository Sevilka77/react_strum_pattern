import { PlayIcon, SquareIcon } from "./Icons";
import * as Tone from "tone";
import { memo } from "react";

const ButtonPlayStopNM = ({ isPlaying, dispatch }) => {
  const handleClick = async () => {
    // Убедитесь, что Tone.js запущен
    await Tone.start();
    isPlaying ? Tone.getTransport().stop() : Tone.getTransport().start();

    dispatch({ type: "setIsPlay", data: !isPlaying });
  };
  return (
    <span
      color="inherit"
      onClick={handleClick}
      aria-label="Старт/стоп воспроизведения"
    >
      {isPlaying ? <SquareIcon /> : <PlayIcon />}
    </span>
  );
};
const ButtonPlayStop = memo(ButtonPlayStopNM);
export default ButtonPlayStop;
