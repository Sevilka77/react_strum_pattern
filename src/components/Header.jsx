import { Typography, Box, AppBar, Toolbar } from "@mui/material";
import ThemeToggleButton from "./ThemeToggleButton";
import About from "./About";

function Header() {
  return (
    <Box sx={{ gridArea: "header", flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Тренажер гитарного боя
          </Typography>
          <About color="inherit" />
          <ThemeToggleButton color="inherit">Login</ThemeToggleButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
