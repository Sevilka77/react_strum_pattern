import { useState } from "react";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { DeleteIcon } from "lucide-react";
import { ArrowD, XDownIcon, XIcon } from "./Icons";
import { memo } from "react";
import ButtonShare from "./ButtonShare";

const PatternEditNM = ({ beatPattern, dispatch }) => {
  const [beats] = useState(beatPattern.split(""));

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

    dispatch({ type: "setBeatPattern", data: beats.join("") });
    console.log(beatPattern);
  };

  return (
    <Box
      elevation={4}
      sx={{ display: "flex", width: "100%", justifyContent: "center" }}
    >
      <BottomNavigation
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "flex-end",
          flexWrap: "wrap",
          height: "auto",
        }} // Чтобы разместить элементы по краям
      >
        <BottomNavigationAction
          onClick={() => handleChange("A")}
          value="disable"
          icon={<ArrowD color="warning" />}
          sx={{ flex: "1 1 auto", p: 2 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("1")}
          value="disable"
          icon={<ArrowD color="primary" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("c")}
          value="disable"
          icon={<XDownIcon color="primary" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("x")}
          value="disable"
          icon={<XIcon color="primary" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("0")}
          value="disable"
          icon={<ArrowD color="disabled" />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
        <BottomNavigationAction
          onClick={() => handleChange("del")}
          value="delete"
          icon={<DeleteIcon />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />

        <BottomNavigationAction
          value="settings"
          icon={<ButtonShare beatPattern={beatPattern} />}
          sx={{ flex: "1 1 auto", px: 0 }} // Отступы и размеры
        />
      </BottomNavigation>
    </Box>
  );
};

const PatternEdit = memo(PatternEditNM);
export default PatternEdit;
