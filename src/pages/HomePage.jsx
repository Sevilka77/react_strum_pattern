import { Paper } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PatternList from "../components/PatternList";

function HomePage() {
  return (
    <>
      <Header />
      <Paper>
        <PatternList />
      </Paper>
      <Footer />
    </>
  );
}

export default HomePage;
