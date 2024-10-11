import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useConfig } from "../useConfig";
import ButtonPlayStop from "./ButtonPlayStop";
import TempoSelector from "./TempoSelector";
import SettingsDialog from "./Settings";
import { Paper } from "@mui/material";

export default function ControlFooter() {
  const { config, dispatch } = useConfig();
  return (
    <Paper elevation={4} sx={{ width: "100%" }}>
      <BottomNavigation
        sx={{ display: "flex", justifyContent: "space-between" }} // Чтобы разместить элементы по краям
      >
        <BottomNavigationAction
          value="play"
          icon={
            <ButtonPlayStop isPlaying={config.isPlaying} dispatch={dispatch} />
          }
          sx={{ maxWidth: "30px", px: 0 }} // Отступы и размеры
        />

        <TempoSelector tempo={config.tempo} dispatch={dispatch} />
        <BottomNavigationAction
          value="settings"
          icon={<SettingsDialog />}
          sx={{ maxWidth: "30px", px: 0 }} // Отступы и размеры
        />
      </BottomNavigation>
    </Paper>
  );
}
