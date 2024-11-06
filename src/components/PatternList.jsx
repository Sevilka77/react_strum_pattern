import { patterns } from "../patterns";
import { useCallback, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BeatImage from "./BeatImage";

const PatternListItem = ({ pattern, onClick }) => (
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
      onClick={() => onClick(pattern)}
      aria-label={`Выбрать бой: ${pattern.title}`}
    >
      <BeatImage beatString={pattern.pattern} />
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

  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: filteredPatterns.map((pattern, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: pattern.title,
        url: `/pattern/${pattern.pattern}`,
        image: `data:image/svg+xml;utf8,${encodeURIComponent(pattern.pattern)}`,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [filteredPatterns]);

  return (
    <>
      <List component="ul">
        {filteredPatterns.map((p) => (
          <>
            <PatternListItem key={p.title} pattern={p} onClick={onClick} />
            <Divider component="li" key={`${p.title}-divider`} />
          </>
        ))}
      </List>
    </>
  );
};

export default PatternList;
