import { Typography, Box, Stack } from "@mui/material";
import ThemeToggleButton from "./ThemeToggleButton";
import About from "./About";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",

        flexDirection: "row",

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
      <Stack direction="row">
        <ThemeToggleButton />
        <About />
      </Stack>
    </Box>
  );
}

export default Header;
