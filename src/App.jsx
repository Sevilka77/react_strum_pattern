import { useState, useMemo, useReducer, useEffect, createContext } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { useSearchParams } from "react-router-dom";
import Metronome from "./components/Metronome";
import PatternList from "./components/PatternLIst";
import TempoSelector from "./components/TempoSelector";

import {
  Stack,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import Visual from "./components/visual";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MoonIcon, SunIcon } from "lucide-react";
import PlayButton from "./components/PlayButton";
import MetronomeButton from "./components/MetronomeButton";
import BeatSound from "./components/BeatSound";
import Share from "./components/Share";
import NoteSizeButton from "./components/NoteSizeButton";
import PatternButton from "./components/PatternButton";
import PatternEdit from "./components/PatternEdit";

export const MIN_TEMPO = 40;
export const MAX_TEMPO = 300;

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "setTempo":
      // eslint-disable-next-line no-case-declarations
      let newTempo = action.data.tempo;
      if (newTempo === undefined) return state;
      newTempo = Math.min(newTempo, MAX_TEMPO);
      newTempo = Math.max(newTempo, MIN_TEMPO);
      newState.tempo = newTempo;
      break;
    case "setBeatCount":
      // eslint-disable-next-line no-case-declarations
      let beatCount = action.data.beatCount;
      if (beatCount === undefined) return state;
      // eslint-disable-next-line no-case-declarations
      let beatPatternCount = state.beatPattern;
      if (beatCount > beatPatternCount.length) {
        for (let i = beatPatternCount.length; i < beatCount; i++)
          beatPatternCount.push("rest");
      } else if (beatCount < state.beatPattern.length) {
        for (let i = beatPatternCount.length; i > beatCount; i--)
          beatPatternCount.pop();
      }
      newState.beatPattern = beatPatternCount;
      break;
    case "setBeatPattern":
      // eslint-disable-next-line no-case-declarations
      let beatPattern = action.data.split("");
      if (beatPattern === undefined) return state;
      newState.beatPattern = beatPattern;
      break;
    case "setNoteSize":
      // eslint-disable-next-line no-case-declarations
      let noteSize = action.data;
      if (noteSize === undefined) return state;
      newState.note = noteSize;
      break;
    case "setIsPlay":
      newState.isPlaying = action.data;
      break;
    case "setIsBeatSound":
      newState.isBeatSound = action.data;
      break;
    case "setIsMetronomSound":
      newState.isMetronomeSound = action.data;
      break;
    default:
      return state;
  }
  return newState;
}
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 770px)");
  const [mode, setMode] = useState("light");
  const [showPB, setPB] = useState(false);
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [beatPattern, setBeatPattern] = useState("1101");

  const [config, dispatch] = useReducer(reducer, {
    tempo: 60,
    note: 4,
    isPlaying: false,
    isMetronomeSound: false,
    isBeatSound: false,
  });

  useEffect(() => {
    if (!searchParams.has("p")) {
      setSearchParams({ p: "1101" });
    } else {
      console.log(searchParams.get("p"));
      setBeatPattern(searchParams.get("p"));
    }
  }, [searchParams, setSearchParams]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={
            (isMediumDevice && {
              boxSizing: "border-box",

              height: "100vh",
              display: "grid",
              gridTemplateColumns: "repeat(10,1fr)",
              gridTemplateRows: "1fr 2fr 1fr 1fr ",
              gridTemplateAreas: `"header header header header header header header header header header"
                                "main main main main main main main main main main"
                                ". . . . . . edit edit edit edit"
                                "PB MB BB NB tempo tempo tempo PLB PEB SB"`,
            }) ||
            (isSmallDevice && {
              boxSizing: "border-box",
              height: "100vh",
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gridTemplateRows: "1fr 2fr 1fr 1fr 1fr 1fr",
              gridTemplateAreas: `"header header header header"
                                "main main main main "
                                "edit edit edit edit"
                                "tempo tempo tempo tempo"
                                "PB MB BB NB"
                                "PB PLB PEB SB"`,
            })
          }
        >
          <Box
            sx={{
              display: "flex",
              height: "min-content",
              flexDirection: "row",
              gridArea: "header",
              borderBottom: "1px solid #5f5f5f",
              alignContent: "center",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <div />
            <Typography
              sx={{
                textTransform: "uppercase",
                textAlign: "center",
                fontSize: "20px",
                letterSpacing: "2px",
              }}
            >
              Тренажёр гитарного боя
            </Typography>

            <IconButton
              onClick={colorMode.toggleColorMode}
              color="inherit"
              sx={{
                fontSize: "40px",
                borderRadius: "50%",
                border: "1px solid#f5f5f5",
              }}
            >
              {theme.palette.mode === "dark" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Box>
          <Box sx={{ gridArea: "main" }}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Metronome
                config={config}
                isSmd={isSmallDevice}
                beatPattern={beatPattern.split("")}
              />
              <Visual
                toggleStart={config.isPlaying ? "swing" : "stop"}
                swing={120 / config.tempo}
              />
            </Stack>
          </Box>
          <Box sx={{ gridArea: "edit", alignSelf: "end" }}>
            {showPB && (
              <PatternEdit
                beatPattern={beatPattern.split("")}
                onPatternChanged={(beatPattern) => {
                  setSearchParams({ p: beatPattern });
                }}
              />
            )}
          </Box>
          <Box
            sx={{ gridArea: "PB", alignSelf: "center", justifySelf: "center" }}
          >
            <PlayButton
              onConfigChanged={(event, data) =>
                dispatch({ type: event, data: data })
              }
              config={config}
            />
          </Box>
          <Box
            sx={{ gridArea: "MB", alignSelf: "center", justifySelf: "center" }}
          >
            <MetronomeButton
              onConfigChanged={(event, data) =>
                dispatch({ type: event, data: data })
              }
              config={config}
            />
          </Box>
          <Box
            sx={{ gridArea: "BB", alignSelf: "center", justifySelf: "center" }}
          >
            <BeatSound
              onConfigChanged={(event, data) =>
                dispatch({ type: event, data: data })
              }
              config={config}
            />
          </Box>
          <Box
            sx={{ gridArea: "NB", alignSelf: "center", justifySelf: "center" }}
          >
            <NoteSizeButton
              onConfigChanged={(event, data) =>
                dispatch({ type: event, data: data })
              }
              config={config}
            />
          </Box>
          <Box
            sx={{
              gridArea: "tempo",
              alignSelf: "center",
              p: "15px",
            }}
          >
            <TempoSelector
              tempo={config.tempo}
              onTempoChanged={(tempo) =>
                dispatch({ type: "setTempo", data: { tempo } })
              }
            />
          </Box>
          <Box
            sx={{ gridArea: "PLB", alignSelf: "center", justifySelf: "center" }}
          >
            <PatternList
              onPatternChanged={(beatPattern) => {
                setSearchParams({ p: beatPattern.pattern });
              }}
            ></PatternList>
          </Box>
          <Box
            sx={{ gridArea: "PEB", alignSelf: "center", justifySelf: "center" }}
          >
            <PatternButton
              onChanged={() => {
                setPB(!showPB);
              }}
            />
          </Box>
          <Box
            sx={{ gridArea: "SB", alignSelf: "center", justifySelf: "center" }}
          >
            <Share />
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
