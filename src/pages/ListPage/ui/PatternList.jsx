import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PatternListItem from "./PatternListItem";

const PatternList = ({ patterns }) => {
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{
        my: {
          xs: 4, // Мобильные устройства
          sm: 4, // Средние устройства
          md: 4, // Большие устройства
        },
      }}
    >
      {patterns.length > 0 ? (
        patterns.map((pattern) => (
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
