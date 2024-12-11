import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
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
