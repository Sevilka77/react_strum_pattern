import { patterns } from "../patterns";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom"; // Для перехода на другие страницы
import BeatImage from "./BeatImage";
import { useState } from "react";

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },

  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "2px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.9,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },

  color: "inherit",
}));

const PatternListItem = ({ pattern, index }) => {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Grid item size={{ xs: 12, sm: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
          height: "100%",
        }}
      >
        {/* Заголовок с фокусом и условной стилизацией */}
        <TitleTypography
          gutterBottom
          variant="h6"
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          tabIndex={0} // Это позволяет фокусировать элемент с клавиатуры
          className={focusedCardIndex === index ? "Mui-focused" : ""}
          component="h3"
        >
          <Link
            to={`/pattern/${pattern.pattern}`} // Ссылка на маршрут
            style={{ textDecoration: "none", color: "inherit" }} // Сброс стилей ссылки
          >
            {pattern.title}
          </Link>
        </TitleTypography>

        <Box sx={{ position: "relative", width: "100%" }}>
          <BeatImage beatString={pattern.pattern} />
        </Box>
      </Box>
    </Grid>
  );
};

const PatternList = ({ level }) => {
  // Фильтруем паттерны по уровню сложности
  const filteredPatterns = patterns.filter((p) => p.level === level);

  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{
        my: {
          xs: 6, // Мобильные устройства
          sm: 8, // Средние устройства
          md: 14, // Большие устройства
        },
      }}
    >
      {filteredPatterns.length > 0 ? (
        filteredPatterns.map((pattern) => (
          <PatternListItem key={pattern.title} pattern={pattern} />
        ))
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ width: "100%" }}
        >
          Нет паттернов для выбранного уровня
        </Typography>
      )}
    </Grid>
  );
};

export default PatternList;
