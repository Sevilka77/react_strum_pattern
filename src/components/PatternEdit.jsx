import { useState, useEffect } from "react";

import { Button, Grid } from "@mui/material";
import { DeleteIcon } from "lucide-react";

export default function PatternEdit({ beatPattern, onPatternChanged }) {
  const [beats, setBeats] = useState(beatPattern);
  const handleChange = (event) => {
    if (event === "A") {
      beats.push("A");
    }
    if (event === "1") {
      beats.push("1");
    }
    if (event === "0") {
      beats.push("0");
    }
    if (event === "x") {
      beats.push("x");
    }
    if (event === "c") {
      beats.push("c");
    }
    if (event === "del") {
      if (beats.length > 0) beats.pop();
    }
    console.log(beats);
    onPatternChanged(beats.join(""));
  };
  useEffect(() => {
    setBeats(beatPattern.slice(""));
  }, [beatPattern]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      mt={1}
      columns={{ xs: 2, sm: 3, md: 12 }}
      bottom={0}
    >
      <Button onClick={() => handleChange("A")}>Aкцент</Button>
      <Button onClick={() => handleChange("1")}>Удар</Button>
      <Button onClick={() => handleChange("c")}>Щелчок</Button>
      <Button onClick={() => handleChange("x")}>Заглушка</Button>
      <Button onClick={() => handleChange("0")}>Пропуск</Button>
      <Button onClick={() => handleChange("del")}>
        <DeleteIcon />
      </Button>
    </Grid>
  );
}
