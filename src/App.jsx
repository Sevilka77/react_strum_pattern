import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Stack, Box, useMediaQuery } from "@mui/material";

import ButtonPatternList from "./components/ButtonPatternList.jsx";
import TempoSelector from "./components/TempoSelector";
import MetronomeWrapper from "./components/MetronomeWrapper";
import ButtonPlayStop from "./components/ButtonPlayStop.jsx";
import ButtonMetronomeSound from "./components/ButtonMetronomeSound.jsx";
import ButtonBeatSound from "./components/ButtonBeatSound";
import ButtonShare from "./components/ButtonShare.jsx";
import ButtonNoteSize from "./components/ButtonNoteSize.jsx";
import ButtonPatternEdit from "./components/ButtonPatternEdit.jsx";
import PatternEdit from "./components/PatternEdit";

import ThemeContextProvider from "./components/ThemeContextProvider"; // Импортируем новый компонент

import Header from "./components/Header";
import { useConfig } from "./useConfig";
import useWakeLock from "./hooks/useWakeLock.jsx";

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
            gridTemplateRows: "1fr 2fr 1fr 1fr",
            gridTemplateAreas: `"header header header header header header header header header header"
                              "main main main main main main main main main main"
                              ". . . . . . edit edit edit edit"
                              "MB BB NB tempo tempo tempo tempo PLB PEB SB"`,
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
        <Header />
        <Box sx={{ gridArea: "main" }}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <MetronomeWrapper isSmallDevice={isSmallDevice} />
          </Stack>
        </Box>
        <Box sx={{ gridArea: "edit", alignSelf: "end" }}>
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
        <Box
          sx={{ gridArea: "PLB", alignSelf: "center", justifySelf: "center" }}
        >
          <ButtonPatternList dispatch={dispatch} />
        </Box>
        <Box
          sx={{ gridArea: "PEB", alignSelf: "center", justifySelf: "center" }}
        >
          <ButtonPatternEdit onChanged={handleTogglePB} />
        </Box>
        <Box
          sx={{ gridArea: "SB", alignSelf: "center", justifySelf: "center" }}
        >
          <ButtonShare beatPattern={config.beatPattern} />
        </Box>
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
