import { useState } from "react";
import { AppBar, Toolbar, IconButton, Stack } from "@mui/material";

import MetronomePlayButton from "@/features/metronome/ui/MetronomePlayButton";
import MetronomeButton from "../../tone/ui/MetronomeSoundButton";
import MetronomeTempoSelector from "@/features/metronome/ui//MetronomeTempoSelector";
import GuitarSoundButton from "../../tone/ui/GuitarSoundButton";
import HitSoundButton from "../../tone/ui/HitSoundButton";

import { CaretDown, Control } from "@phosphor-icons/react";
import ChordChange from "../../tone/ui/ChordChange";

const ControlFooter = ({
  prevButton = null,
  nextButton = null,
  settingsSlot = null,
}) => {
  const [expanded, setExpanded] = useState(false); // Состояние для раскрытия футера

  const toggleDrawer = () => {
    setExpanded((prev) => !prev); // Переключение состояния раскрытия
  };

  return (
    <>
      <AppBar
        component="div"
        variant="outlined"
        position="relative"
        elevation={0}
        sx={{
          width: "100vw",
          bottom: 0,
          top: "auto",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
        }}
      >
        <Toolbar sx={{ justifyContent: "center", flexDirection: "column" }}>
          <IconButton size="small" onClick={toggleDrawer}>
            {expanded ? <CaretDown size={16} /> : <Control size={16} />}
          </IconButton>
          {expanded && settingsSlot}
          {expanded && <MetronomeTempoSelector />}

          <Stack p={1} direction={"row"} alignItems="center" spacing={2}>
            {prevButton}
            <HitSoundButton />
            <MetronomeButton />
            <MetronomePlayButton />
            <GuitarSoundButton />
            <ChordChange />
            {nextButton}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ControlFooter;
