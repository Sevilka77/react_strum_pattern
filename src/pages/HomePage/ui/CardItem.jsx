import { Card, CardActions, CardContent, Typography } from "@mui/material";
import CardButton from "./CardButton";
import { Link } from "react-router-dom";

const CardItem = ({ title, description, color, link }) => {
  return (
    <Card
      component="li"
      variant="outlined"
      sx={{
        backgroundBlendMode: "overlay",
        minWidth: 275,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography
          color={color}
          variant="h6"
          component="h2"
          textAlign="center"
          fontWeight="bold"
          marginBottom={2}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2, mt: "auto" }}>
        <CardButton variant="custom" component={Link} to={link}>
          {title}
        </CardButton>
      </CardActions>
    </Card>
  );
};

export default CardItem;
