import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Stack, Box, useMediaQuery } from "@mui/material";

import PatternList from "./components/PatternLIst";
import TempoSelector from "./components/TempoSelector";
import MetronomeWrapper from "./components/MetronomeWrapper";
import PlayButton from "./components/PlayButton";
import MetronomeButton from "./components/MetronomeButton";
import BeatSound from "./components/BeatSound";
import Share from "./components/Share";
import NoteSizeButton from "./components/NoteSizeButton";
import PatternButton from "./components/PatternButton";
import PatternEdit from "./components/PatternEdit";

import ThemeContextProvider from "./components/ThemeContextProvider"; // Импортируем новый компонент

import Header from "./components/Header";
import { useConfig } from "./useConfig";

function App() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 770px)");
  const [showPB, setPB] = useState(false);
  const { config, dispatch } = useConfig();
  const [searchParams, setSearchParams] = useSearchParams();

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
            <PlayButton />
          </Stack>
        </Box>
        <Box sx={{ gridArea: "edit", alignSelf: "end" }}>
          {showPB && <PatternEdit />}
        </Box>
        <Box
          sx={{ gridArea: "PB", alignSelf: "center", justifySelf: "center" }}
        ></Box>
        <Box
          sx={{ gridArea: "MB", alignSelf: "center", justifySelf: "center" }}
        >
          <MetronomeButton />
        </Box>
        <Box
          sx={{ gridArea: "BB", alignSelf: "center", justifySelf: "center" }}
        >
          <BeatSound />
        </Box>
        <Box
          sx={{ gridArea: "NB", alignSelf: "center", justifySelf: "center" }}
        >
          <NoteSizeButton />
        </Box>
        <Box
          sx={{
            gridArea: "tempo",
            alignSelf: "center",
            p: "15px",
          }}
        >
          <TempoSelector />
        </Box>
        <Box
          sx={{ gridArea: "PLB", alignSelf: "center", justifySelf: "center" }}
        >
          <PatternList />
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
    </ThemeContextProvider>
  );
}

export default App;
