import { useState, useEffect } from "react";

import { Button, Stack } from "@mui/material";
import { DeleteIcon } from "lucide-react";
import { ArrowD, XDownIcon, XIcon } from "./Icons";

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
    <Stack direction="row" flexWrap="wrap" justifyContent="center">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <ArrowD color="warning" />
        <Button onClick={() => handleChange("A")}>Aкцент</Button>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <ArrowD color="warning.main" />
        <Button onClick={() => handleChange("1")}>Удар</Button>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <XDownIcon />
        <Button onClick={() => handleChange("c")}>Удар по заглушенным</Button>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <XIcon />
        <Button onClick={() => handleChange("x")}>Заглушка</Button>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <ArrowD color="disabled" />
        <Button onClick={() => handleChange("0")}>Пропуск</Button>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <DeleteIcon />
        <Button onClick={() => handleChange("del")}>Удалить</Button>
      </Stack>
    </Stack>
  );
}
