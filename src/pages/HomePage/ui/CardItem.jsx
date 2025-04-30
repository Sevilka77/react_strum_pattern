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
        "&:hover": {
          boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.2)", // hover:shadow-blue-900/20
        },
      }}
    >
      <CardContent>
        <Typography
          color={color}
          variant="h6"
          component="h2"
          textAlign="center"
          fontWeight={500}
          marginBottom={2}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          mb={3}
          sx={{ opacity: 0.9, lineHeight: 1.625 }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
        <CardButton variant="custom" component={Link} to={link}>
          {title}
        </CardButton>
      </CardActions>
    </Card>
  );
};

export default CardItem;
