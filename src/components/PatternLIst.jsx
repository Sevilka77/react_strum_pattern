import { patterns } from "../patterns";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
import { ListIcon } from "./Icons";
import BeatImage from "./BeatImage";

export default function PatternList({ onPatternChanged }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {patterns.map((pattern, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => onPatternChanged(pattern)}>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 10,
                  fontWeight: "medium",
                  lineHeight: "10px",
                }}
                key={pattern.title}
                primary={pattern.title}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BeatImage beatString={pattern.pattern} />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Tooltip title="Выбрать бой" placement="top">
      <Box>
        <IconButton
          sx={{
            color: "text.primary",
            fontSize: "40px",
            borderRadius: "50%",
            border: "1px solid#f5f5f5",
          }}
          onClick={toggleDrawer(true)}
        >
          <ListIcon fontSize="inherit" />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Box>
    </Tooltip>
  );
}
