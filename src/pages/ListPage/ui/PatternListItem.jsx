// src/pages/ListPage/ui/PatternListItem.jsx
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom"; // Для перехода на другие страницы
import BeatImage from "@/shared/ui/BeatImage";
import { useState } from "react";
import { styled } from "@mui/material/styles";
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
    <Grid size={{ xs: 12, sm: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
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

        <Box sx={{ position: "relative", height: "24px", maxHeight: "100%" }}>
          <BeatImage title={pattern.title} beatString={pattern.pattern} />
        </Box>
      </Box>
    </Grid>
  );
};

export default PatternListItem;
