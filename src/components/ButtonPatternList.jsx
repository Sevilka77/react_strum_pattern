import { patterns } from "../patterns";
import { memo, useState, useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Drawer, Button, IconButton } from "@mui/material";
import { MenuIcon } from "lucide-react";

import BeatImage from "./BeatImage";

const PatternListItem = ({ pattern, onClick, isSmallDevice, onClose }) => (
  <ListItem disablePadding>
    <ListItemButton
      onClick={() => {
        onClick(pattern.pattern);
        if (isSmallDevice) {
          onClose(); // Закрытие Drawer на маленьких экранах
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallDevice ? "column" : "row", // Вертикальное расположение на маленьких экранах
          alignItems: "start",
          width: "100%", // Занимает всю ширину родителя
        }}
      >
        <ListItemText
          primaryTypographyProps={{
            fontSize: 10,
            fontWeight: "medium",
            lineHeight: "10px",
          }}
          primary={pattern.title}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Центрирование по горизонтали
            width: "auto", // Ширина контента
            flexShrink: 0, // Чтобы изображение не сжималось
          }}
        >
          <BeatImage beatString={pattern.pattern} />
        </Box>
      </Box>
    </ListItemButton>
  </ListItem>
);
const MemoizedPatternListItem = memo(PatternListItem);

const PatternList = ({ dispatch, isSmallDevice }) => {
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

  const DrawerList = ({ isSmallDevice, onClick, onClose }) => (
    <Box
      sx={{ width: isSmallDevice ? "100%" : "450" }} // Устанавливаем ширину DrawerList в зависимости от устройства
      role="presentation"
    >
      <List>
        {patterns.map((pattern) => (
          <MemoizedPatternListItem
            key={pattern.title} // Assuming titles are unique
            pattern={pattern}
            onClick={onClick}
            isSmallDevice={isSmallDevice}
            onClose={onClose}
          />
        ))}
      </List>
    </Box>
  );
  return (
    <>
      {isSmallDevice ? (
        <IconButton
          value="chplayeck"
          onClick={toggleDrawer(true)}
          color="inherit"
          sx={{
            fontSize: "40px",
            borderRadius: "50%",
          }}
        >
          <MenuIcon />
        </IconButton>
      ) : (
        <Button
          color="inherit"
          sx={{
            borderRadius: "8px",
            justifyContent: "center", // Выравниваем по центру по горизонтали
          }}
          onClick={toggleDrawer(true)}
        >
          Загрузить
        </Button>
      )}
      <Drawer keepMounted open={open} onClose={toggleDrawer(false)}>
        <DrawerList
          isSmallDevice={isSmallDevice}
          onClick={onClick}
          onClose={toggleDrawer(false)}
        />
      </Drawer>
    </>
  );
};
const ButtonPatternList = memo(PatternList);

export default ButtonPatternList;
