import { patterns } from "../patterns";
import { useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Card, CardContent, Divider, Grid, Toolbar } from "@mui/material";
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
        sx={{ py: 0 }}
        primary={pattern.title}
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
      <Toolbar />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <List>
                {patterns.map((p) => (
                  <div key={`${p.title}-div`}>
                    <PatternListItem
                      key={p.title}
                      pattern={p}
                      onClick={onClick}
                    />
                    <Divider component="li" key={`${p.title}-divider`} />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PatternList;
