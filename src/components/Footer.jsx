import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <Typography variant="body1">
        {"Коментарии и пожелания в "}
        <Link href="https://t.me/+v5HFvtdzhgUyOWYy" underline="hover">
          Телеграм
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
