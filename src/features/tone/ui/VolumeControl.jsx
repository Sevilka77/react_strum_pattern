import { useState } from "react";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { channels } from "../lib/toneSetup";

// Компонент управления громкостью для конкретного канала
function VolumeControl({ channelName, channel, volume, onVolumeChange }) {
  return (
    <div>
      <Typography variant="body1">{channelName}</Typography>
      <Slider
        min={-50}
        max={0}
        step={1}
        value={volume}
        onChange={(e, value) => onVolumeChange(channel, value)}
        aria-label={`${channelName} Volume`}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

// Основной компонент
export default function VolumeControls() {
  // Устанавливаем начальную громкость для каждого канала
  const [clickVolume, setClickVolume] = useState(
    channels.clickChannel.volume.value,
  );
  const [hitVolume, setHitVolume] = useState(channels.hitChannel.volume.value);
  const [guitarVolume, setGuitarVolume] = useState(
    channels.guitarChannel.volume.value,
  );
  const [masterVolume, setMasterVolume] = useState(
    channels.master.volume.value,
  );

  // Обработчики изменения громкости для каждого канала
  const handleClickVolumeChange = (newVolume) => {
    setClickVolume(newVolume);
    channels.clickChannel.volume.value = newVolume;
  };

  const handleHitVolumeChange = (newVolume) => {
    setHitVolume(newVolume);
    channels.hitChannel.volume.value = newVolume;
  };

  const handleGuitarVolumeChange = (newVolume) => {
    setGuitarVolume(newVolume);
    channels.guitarChannel.volume.value = newVolume;
  };
  const handleMasterVolumeChange = (newVolume) => {
    setMasterVolume(newVolume);
    channels.master.volume.value = newVolume;
  };
  return (
    <div>
      <VolumeControl
        channelName="Общая громкость"
        channel={channels.master}
        volume={masterVolume}
        onVolumeChange={(_, value) => handleMasterVolumeChange(value)}
      />
      <VolumeControl
        channelName="Громкость метронома"
        channel={channels.clickChannel}
        volume={clickVolume}
        onVolumeChange={(_, value) => handleClickVolumeChange(value)}
      />

      <VolumeControl
        channelName="Громкость гитары"
        channel={channels.guitarChannel}
        volume={guitarVolume}
        onVolumeChange={(_, value) => handleGuitarVolumeChange(value)}
      />
      <VolumeControl
        channelName="Громкость отстукивания"
        channel={channels.hitChannel}
        volume={hitVolume}
        onVolumeChange={(_, value) => handleHitVolumeChange(value)}
      />
    </div>
  );
}
