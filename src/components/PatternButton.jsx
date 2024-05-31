import { IconButton } from "@mui/material";

import { createSvgIcon } from "@mui/material/utils";
const EditIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>,
  "EditIcon",
);

export default function PatternButton({ onChanged }) {
  return (
    <IconButton
      value="check"
      onClick={() => {
        onChanged();
      }}
      sx={{ fontSize: "40px", borderRadius: "50%", border: "1px solid#f5f5f5" }}
    >
      <EditIcon fontSize="inherit" />
    </IconButton>
  );
}
