import { patterns } from "../patterns";

import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import { Link } from "react-router-dom"; // Импортируем Link

import BeatImage from "./BeatImage";

const PatternListItem = ({ pattern }) => (
  <ListItem
    alignItems="flex-start"
    // disableGutters
    sx={{ flexDirection: "column", py: 0 }}
  >
    <ListItemText
      sx={{ py: 1 }}
      primary={<Typography variant="body1">{pattern.title}</Typography>}
    />
    <ListItemButton
      disableGutters
      sx={{ py: 0 }}
      aria-label={`Выбрать бой: ${pattern.title}`}
    >
      <Link
        to={`/pattern/${pattern.pattern}`}
        state={pattern}
        style={{ textDecoration: "none" }}
        aria-label={`Ссылка на паттерн боя с названием: ${pattern.title}`}
      >
        <ListItemIcon
          sx={{ flexWrap: "wrap" }}
          alt={`Изображение паттерна боя с названием: ${pattern.title}`}
        >
          <BeatImage beatString={pattern.pattern} />
        </ListItemIcon>
      </Link>
    </ListItemButton>
  </ListItem>
);

const PatternList = ({ level }) => {
  // Фильтруем паттерны по уровню сложности
  const filteredPatterns = patterns.filter((p) => p.level === level);

  return (
    <List component="ul">
      {filteredPatterns.map((p) => (
        <PatternListItem key={p.title} pattern={p} s />
      ))}
    </List>
  );
};

export default PatternList;
