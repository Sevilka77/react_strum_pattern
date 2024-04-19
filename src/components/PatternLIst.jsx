import { patterns } from "../patterns"
import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Drawer } from "@mui/material";

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
            <ListItemButton>
              <ListItemText primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 'medium',
                lineHeight: '10px',
              }}
                key={pattern.title} onClick={() => onPatternChanged(pattern)} primary={pattern.title} />
            </ListItemButton>
          </ListItem>))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Выбрать бой</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
