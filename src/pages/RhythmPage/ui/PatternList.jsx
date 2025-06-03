import BeatImage from "@/shared/ui/BeatImage";

import { Card, CardContent, Box, Typography } from "@mui/material";

const PatternList = ({ patterns, onSelect }) => {
  return (
    <Box
      component="ul"
      sx={{
        display: "grid", // Устанавливаем Grid

        gridTemplateColumns: {
          xs: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(4, 1fr)",
        }, // Сетка
        p: 0,
        gap: {
          xs: 1, // Мобильные устройства
          md: 1, // Средние устройства
          lg: 1,
        },
        listStyle: "none", // Убираем маркеры списка
      }}
    >
      {patterns.length > 0 ? (
        patterns.map((pattern) => (
          <Card
            component="li"
            key={pattern.id}
            variant="outlined"
            onClick={() => onSelect(pattern.id)}
            sx={{
              cursor: "pointer",
              backgroundBlendMode: "overlay",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "&:hover": {
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.2)", // hover:shadow-blue-900/20
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                textAlign="center"
                fontWeight={500}
                marginBottom={2}
              >
                {pattern.title}
              </Typography>{" "}
              <Box sx={{}}>
                <BeatImage title={pattern.title} beatString={pattern.pattern} />
              </Box>
            </CardContent>
          </Card>
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
    </Box>
  );
};

export default PatternList;
