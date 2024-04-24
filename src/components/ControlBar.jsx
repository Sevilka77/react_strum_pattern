
//import IncDec from "./IncDec";
//import Slider from '@mui/material/Slider';
//import * as React from 'react'
import { Divider, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';



import { Volume2Icon, VolumeXIcon, DrumIcon, PlayIcon, SquareIcon } from 'lucide-react';
import Share from './Share';






export default function ControlBar({ config, onConfigChanged }) {

  const handleNoteChange = (event, value) => {
    onConfigChanged("setNoteSize", value);
  };
  const handleContolChange = (event, value) => {
    if (value == "45") {
      onConfigChanged("setIsBeatSound", !config.isBeatSound)
    }
    if (value == "44") {
      onConfigChanged("setIsMetronomSound", !config.isMetronomeSound)
    }
    if (value == "46") {
      onConfigChanged("setIsPlay", !config.isPlaying)
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
        '& .MuiToggleButtonGroup-grouped ': {
          border: 0,
        },
      }}
    >
      <ToggleButtonGroup styled={{ border: 0 }}

        exclusive
        value={config.note}
        onChange={handleNoteChange}
        aria-label="text note"
      >
        <ToggleButton value="4" aria-label="4">
          4/4
        </ToggleButton>
        <ToggleButton value="2" aria-label="2">
          2/4
        </ToggleButton>
        <ToggleButton value="3" aria-label="3">
          3/4
        </ToggleButton>
      </ToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <ToggleButtonGroup onChange={handleContolChange} aria-label="text" >
        <ToggleButton
          value="44"
          selected={config.isMetronomeSound}
        >
          {config.isMetronomeSound ? <VolumeXIcon /> : <Volume2Icon />}
        </ToggleButton>
        <ToggleButton
          value="45"
          selected={config.isBeatSound}
        >
          <DrumIcon />
        </ToggleButton>
        <ToggleButton
          value="46"
          selected={config.isPlaying}
        >
          {config.isPlaying ? <SquareIcon /> : <PlayIcon />}
        </ToggleButton>
        <Share />



      </ToggleButtonGroup>
    </Paper >
  );
}




