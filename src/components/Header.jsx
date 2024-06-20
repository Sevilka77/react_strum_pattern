import { Typography, Box, AppBar, Toolbar } from "@mui/material";
import ButtonThemeToggle from "./ButtonThemeToggle";
import About from "./About";
import { memo } from "react";

const Header = memo(function Header() {
  return (
    <Box sx={{ gridArea: "header", flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Тренажер гитарного боя
          </Typography>
          <About color="inherit" />
          <ButtonThemeToggle color="inherit">Login</ButtonThemeToggle>
        </Toolbar>
      </AppBar>
    </Box>
  );
});
export default Header;
