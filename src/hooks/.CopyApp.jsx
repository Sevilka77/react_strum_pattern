import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppBar, Box, Drawer, Toolbar, useMediaQuery } from "@mui/material";

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
import ButtonUpbeatSound from "./components/ButtonUpbeatSound.jsx";
import ButtonAcsentbeatSound from "./components/ButtonAcsentbeatSound.jsx";

function App() {
  useWakeLock();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 770px)");
  const [showPB, setPB] = useState(false);
  const { config, dispatch } = useConfig();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleTogglePB = useCallback(() => {
    setPB((prevShowPB) => !prevShowPB);
  }, []);

  const [modalOpenSettings, setModalOpenSettings] = useState(false);
  const handleToggleModalSettings = useCallback(() => {
    setModalOpenSettings((prevShowPB) => !prevShowPB);
  }, []);

  useEffect(() => {
    if (searchParams.has("p")) {
      dispatch({ type: "setBeatPattern", data: searchParams.get("p") });
      navigate(window.location.pathname, { replace: true });
    } else {
      dispatch({ type: "setBeatPattern", data: config.beatPattern });
    }
  }, [config.beatPattern, dispatch, navigate, searchParams]);

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
                             ". . . MB BB NB DU .  . ."
                              `,
          }) ||
          (isSmallDevice && {
            boxSizing: "border-box",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateRows: "1fr 2fr 1fr 1fr",
            gridTemplateAreas: `"header  header header"
                              "main main  main"
                              "edit edit  edit"
                              "tempo tempo  tempo"
                              `,
          })
        }
      >
        <Header
          beatPattern={config.beatPattern}
          handleTogglePB={handleTogglePB}
          isSmallDevice={isSmallDevice}
          onOpenModalSettings={handleToggleModalSettings}
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
        {/* Контент для среднего экрана */}
        {isMediumDevice && (
          <Box
            sx={{ gridArea: "MB", alignSelf: "center", justifySelf: "center" }}
          >
            <ButtonMetronomeSound
              isMetronomeSound={config.isMetronomeSound}
              dispatch={dispatch}
            />
            {config.isMetronomeSound && (
              <ButtonAcsentbeatSound
                isAcsentbeatSound={config.isAcsentbeatSound}
                dispatch={dispatch}
              />
            )}
          </Box>
        )}
        {isMediumDevice && (
          <Box
            sx={{ gridArea: "BB", alignSelf: "center", justifySelf: "center" }}
          >
            <ButtonBeatSound
              isBeatSound={config.isBeatSound}
              dispatch={dispatch}
            />
          </Box>
        )}
        {isMediumDevice && (
          <Box
            sx={{ gridArea: "NB", alignSelf: "center", justifySelf: "center" }}
          >
            <ButtonI noteSize={config.noteSize} dispatch={dispatch} />
            <ButtonNoteSize noteSize={config.noteSize} dispatch={dispatch} />
          </Box>
        )}
        a
        {config.noteSize > 4 && isMediumDevice && config.isMetronomeSound && (
          <Box
            sx={{ gridArea: "DU", alignSelf: "center", justifySelf: "center" }}
          >
            <ButtonDownbeatSound
              isDownbeatSound={config.isDownbeatSound}
              dispatch={dispatch}
            />
            <ButtonUpbeatSound
              isUpbeatSound={config.isUpbeatSound}
              dispatch={dispatch}
            />
          </Box>
        )}
        <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              padding: 0,
            }}
          >
            <div
              style={{
                height: "100%",
                aspectRatio: "1 / 1",
              }}
            >
              <ButtonPlayStop
                isPlaying={config.isPlaying}
                dispatch={dispatch}
                color="inherit"
              />
            </div>

            <div
              style={{
                padding: "10px",
                backgroundColor: "white",
                height: "100%",
                width: "100%",
              }}
            >
              <TempoSelector tempo={config.tempo} dispatch={dispatch} />
            </div>
          </Toolbar>
        </AppBar>
        {/* Модальное окно для маленького экрана */}
        <Drawer
          anchor="right"
          keepMounted
          open={modalOpenSettings}
          onClose={handleToggleModalSettings}
        >
          <Box sx={{ width: 250, padding: 2 }}>
            <ButtonMetronomeSound
              isMetronomeSound={config.isMetronomeSound}
              dispatch={dispatch}
            />
            {config.isMetronomeSound && (
              <ButtonAcsentbeatSound
                isAcsentbeatSound={config.isAcsentbeatSound}
                dispatch={dispatch}
              />
            )}
            <ButtonBeatSound
              isBeatSound={config.isBeatSound}
              dispatch={dispatch}
            />
            <ButtonI noteSize={config.noteSize} dispatch={dispatch} />
            <ButtonNoteSize noteSize={config.noteSize} dispatch={dispatch} />
            {config.noteSize > 4 && config.isMetronomeSound && (
              <>
                <ButtonDownbeatSound
                  isDownbeatSound={config.isDownbeatSound}
                  dispatch={dispatch}
                />
                <ButtonUpbeatSound
                  isUpbeatSound={config.isUpbeatSound}
                  dispatch={dispatch}
                />
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
