import { patterns } from "../patterns";
import { useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BeatImage from "./BeatImage";

const PatternListItem = ({ pattern, onClick }) => (
  <ListItem alignItems="flex-start" sx={{ py: 0 }}>
    <ListItemButton
      sx={{ py: 0 }}
      onClick={() => onClick(pattern)}
      aria-label={`Выбрать бой: ${pattern.title}`}
    >
      <ListItemText
        sx={{ py: 1 }}
        primary={
          <Typography variant="h6" component="h4">
            {pattern.title}
          </Typography>
        }
        secondary={<BeatImage beatString={pattern.pattern} />}
      />
    </ListItemButton>
  </ListItem>
);

const PatternList = () => {
  const navigate = useNavigate();

  const onClick = useCallback(
    (p) => {
      navigate(`/pattern/${p.pattern}`, { state: p });
    },
    [navigate], // Указываем зависимости для useCallback
  );

  return (
    <>
      <List component="nav">
        <ListItem alignItems="flex-start" sx={{ py: 0 }}>
          <ListItemButton
            sx={{ py: 0 }}
            aria-label={`Создать свой бой`}
            onClick={() => {
              // Добавляем навигацию на маршрут /pattern/0000
              navigate(`/pattern/0000`, { state: { editMode: true } });
            }}
          >
            <ListItemText
              sx={{ py: 0 }}
              primary={
                <Typography color="#e4bed3" variant="h5" component="h3">
                  Создать свой бой
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
        {patterns.map((p) => (
          <div key={`${p.title}-div`}>
            <PatternListItem key={p.title} pattern={p} onClick={onClick} />
            <Divider component="li" key={`${p.title}-divider`} />
          </div>
        ))}
      </List>
    </>
  );
};

export default PatternList;
