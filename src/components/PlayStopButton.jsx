import { Play, Square } from "lucide-react"
import { useState } from "react"
import Button from '@mui/material/Button';


export default function PlayStopButton({ onPlayStopChanged }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playButtonClickHandler = () => {
    const newIsPlayingState = !isPlaying;
    setIsPlaying(newIsPlayingState);
    onPlayStopChanged(newIsPlayingState);
  };


  const playContent = (
    <>
      <Play width={18} /> <span>Play</span>
    </>
  );


  const stopContent = (
    <>
      <Square width={14} /> <span>Stop</span>
    </>
  );

  return (
    <Button variant="outlined" size="small"

      onClick={playButtonClickHandler}
    >
      {isPlaying ? stopContent : playContent}
    </Button>
  );
}