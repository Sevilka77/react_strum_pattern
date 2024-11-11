import { useState } from "react";
import { channels } from "../hooks/useTone"; // Импортируем каналы из основного кода

// Компонент для управления громкостью одного канала
function VolumeControl({ index, volume, onVolumeChange }) {
  return (
    <div>
      <label>Channel {index + 1} Volume</label>
      <input
        type="range"
        min="-60" // Минимальная громкость в децибелах
        max="0" // Максимальная громкость в децибелах
        step="1"
        value={volume}
        onChange={(e) => onVolumeChange(index, e.target.value)}
      />
      <span>{volume} dB</span>
    </div>
  );
}

// Компонент для управления громкостью всех каналов
export default function VolumeControls() {
  // Изначальная громкость для каждого канала (в децибелах)
  const [volumes, setVolumes] = useState(new Array(6).fill(0)); // Громкость от -60 до 0 dB

  // Функция для обновления громкости канала
  const handleVolumeChange = (index, newVolume) => {
    const newVolumes = [...volumes];
    newVolumes[index] = newVolume;
    setVolumes(newVolumes);

    // Обновление громкости Tone.js канала
    channels[index].volume.value = newVolume;
  };

  return (
    <div>
      <h2>Control Channel Volumes</h2>
      <div>
        {volumes.map((volume, index) => (
          <VolumeControl
            key={index}
            index={index}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        ))}
      </div>
    </div>
  );
}
