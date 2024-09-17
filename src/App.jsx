import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

import TempoSelector from "./components/TempoSelector";
import MetronomeWrapper from "./components/MetronomeWrapper";
import ButtonPlayStop from "./components/ButtonPlayStop.jsx";
import ButtonMetronomeSound from "./components/ButtonMetronomeSound.jsx";
import ButtonDownbeatSound from "./components/ButtonDownbeatSound.jsx";
import ButtonBeatSound from "./components/ButtonBeatSound";

import ButtonNoteSize from "./components/ButtonNoteSize.jsx";

import PatternEdit from "./components/PatternEdit";
import ButtonI from "./components/ButtonI.jsx";

import ThemeContextProvider from "./components/ThemeContextProvider"; // Импортируем новый компонент

import Header from "./components/Header";
import { useConfig } from "./useConfig";
import useWakeLock from "./hooks/useWakeLock.jsx";
import ButtonUpbeatClickSound from "./components/ButtonUpbeatClickSound.jsx";

function App() {
  useWakeLock();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 770px)");
  const [showPB, setPB] = useState(false);
  const { config, dispatch } = useConfig();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTogglePB = useCallback(() => {
    setPB((prevShowPB) => !prevShowPB);
  }, []);

  useEffect(() => {
    if (searchParams.has("p")) {
      dispatch({ type: "setBeatPattern", data: searchParams.get("p") });
      setSearchParams();
    } else {
      dispatch({ type: "setBeatPattern", data: config.beatPattern });
    }
  }, [config.beatPattern, dispatch, searchParams, setSearchParams]);

  return (
    <ThemeContextProvider>
      <Box
        sx={
          (isMediumDevice && {
            boxSizing: "border-box",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "repeat(10,1fr)",
            gridTemplateRows: "1fr 2fr 1fr 1fr 1fr",
            gridTemplateAreas: `"header header header header header header header header header header"
                              "main main main main main main main main main main"
                               ". . edit edit edit edit edit edit . ."
                               ". . . tempo tempo tempo tempo . . ."
                             ". . . MB BB NB . .  . ."
                              `,
          }) ||
          (isSmallDevice && {
            boxSizing: "border-box",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateRows: "1fr 2fr 1fr 1fr 1fr 1fr",
            gridTemplateAreas: `"header  header header"
                              "main main  main"
                              "edit edit  edit"
                              "tempo tempo  tempo"
                              "MB BB NB"
                              "PLB PEB SB"`,
          })
        }
      >
        <Header
          dispatch={dispatch}
          config={config}
          handleTogglePB={handleTogglePB}
        />
        <Box
          sx={{
            gridArea: "main",
            display: "flex",
            fledDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "1%",
          }}
        >
          <MetronomeWrapper isSmallDevice={isSmallDevice} />
        </Box>
        <Box sx={{ gridArea: "edit", alignSelf: "start" }}>
          {showPB && (
            <PatternEdit beatPattern={config.beatPattern} dispatch={dispatch} />
          )}
        </Box>
        <Box
          sx={{ gridArea: "PB", alignSelf: "center", justifySelf: "center" }}
        ></Box>
        <Box
          sx={{ gridArea: "MB", alignSelf: "center", justifySelf: "center" }}
        >
          <ButtonMetronomeSound
            isMetronomeSound={config.isMetronomeSound}
            dispatch={dispatch}
          />
          <ButtonDownbeatSound
            isDownbeatSound={config.isDownbeatSound}
            dispatch={dispatch}
          />
        </Box>
        <Box
          sx={{ gridArea: "BB", alignSelf: "center", justifySelf: "center" }}
        >
          <ButtonBeatSound
            isBeatSound={config.isBeatSound}
            dispatch={dispatch}
          />
        </Box>
        <Box
          sx={{ gridArea: "NB", alignSelf: "center", justifySelf: "center" }}
        >
          <ButtonI noteSize={config.noteSize} dispatch={dispatch} />
          <ButtonUpbeatClickSound
            isUpbeatClickSound={config.isUpbeatClickSound}
            dispatch={dispatch}
          />
          <ButtonNoteSize noteSize={config.noteSize} dispatch={dispatch} />
        </Box>
        <Box
          sx={{
            gridArea: "tempo",
            p: "15px",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            justifyContent: "flex-end",
          }}
        >
          <ButtonPlayStop isPlaying={config.isPlaying} dispatch={dispatch} />
          <TempoSelector tempo={config.tempo} dispatch={dispatch} />
        </Box>
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
