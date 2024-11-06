import { patterns } from "../patterns";
import React, { useCallback } from "react";
import { Divider, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Импортируем Link

import BeatImage from "./BeatImage";

const PatternListItem = ({ pattern }) => (
  <ListItem
    alignItems="flex-start"
    disableGutters
    sx={{ flexDirection: "column", py: 0 }}
  >
    <ListItemText
      sx={{ py: 1 }}
      primary={
        <Typography variant="h6" component="h4">
          {pattern.title}
        </Typography>
      }
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
      >
        <BeatImage beatString={pattern.pattern} />
      </Link>
    </ListItemButton>
  </ListItem>
);

const PatternList = ({ level }) => {
  const navigate = useNavigate();

  const onClick = useCallback(
    (p) => {
      navigate(`/pattern/${p.pattern}`, { state: p });
    },
    [navigate], // Указываем зависимости для useCallback
  );

  // Фильтруем паттерны по уровню сложности
  const filteredPatterns = patterns.filter((p) => p.level === level);

  return (
    <>
      <List component="ul">
        {filteredPatterns.map((p) => (
          <React.Fragment key={p.title}>
            <PatternListItem key={p.title} pattern={p} onClick={onClick} />
            <Divider component="li" key={`${p.title}-divider`} />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default PatternList;
