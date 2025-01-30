import { Card, CardActions, CardContent, Typography } from "@mui/material";
import CardButton from "./CardButton";
import { Link } from "react-router-dom";

const CardItem = ({ title, description, color, link }) => {
  return (
    <Card
      component="li"
      sx={{
        backgroundColor: "rgb(31,41,55)",
        minWidth: 275,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          color={color}
          textAlign="center"
          marginBottom={2}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="#9D9CA4" textAlign="center">
          {description}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <CardButton component={Link} to={link}>
          {title}
        </CardButton>
      </CardActions>
    </Card>
  );
};

export default CardItem;
