import { patterns } from "../patterns"
import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Drawer, IconButton } from "@mui/material";
import { createSvgIcon } from '@mui/material/utils';
const ListIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path d="M21 15V6" /><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path d="M12 12H3" /><path d="M16 6H3" /><path d="M12 18H3" />


  </svg>,
  'ListIcon',
);

export default function PatternList({ onPatternChanged }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {patterns.map((pattern, index) => (
          <ListItem disablePadding key={index}  >
            <ListItemButton onClick={() => onPatternChanged(pattern)}  >
              <ListItemText primaryTypographyProps={{
                fontSize: 10,
                fontWeight: 'medium',
                lineHeight: '10px',

              }} key={pattern.title} primary={pattern.title} />
            </ListItemButton>
          </ListItem>))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton sx={{ fontSize: "40px", borderRadius: "50%", border: "1px solid#f5f5f5" }} onClick={toggleDrawer(true)}><ListIcon fontSize="inherit" /></IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
