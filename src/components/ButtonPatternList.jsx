import { patterns } from "../patterns";
import { memo, useState, useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
import { ListIcon } from "./Icons";
import BeatImage from "./BeatImage";

const Child = ({ value, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => onClick(value.pattern)}>
        <ListItemText
          primaryTypographyProps={{
            fontSize: 10,
            fontWeight: "medium",
            lineHeight: "10px",
          }}
          key={value.title}
          primary={value.title}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BeatImage beatString={value.pattern} />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};
const ChildMemo = memo(Child);

const PatternListNotMemo = ({ dispatch }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const onClick = useCallback(
    (value) => {
      dispatch({ type: "setBeatPattern", data: value });
      console.log(value);
    },
    [dispatch],
  );

  const DrawerList = (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {patterns.map((pattern, index) => (
          <ChildMemo value={pattern} key={index} onClick={onClick} />
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
          }}
          onClick={toggleDrawer(true)}
        >
          <ListIcon fontSize="inherit" />
        </IconButton>
        <Drawer keepMounted open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Box>
    </Tooltip>
  );
};
const ButtonPatternList = memo(PatternListNotMemo);

export default ButtonPatternList;
