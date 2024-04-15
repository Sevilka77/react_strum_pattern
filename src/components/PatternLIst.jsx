import { patterns } from "../patterns"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function PatternList({ onPatternChanged }) {
  return (
    <List>
      {patterns.map((pattern) => (
        <ListItem disablePadding key={pattern.title}  >
          <ListItemButton>
            <ListItemText key={pattern.title} onClick={() => onPatternChanged(pattern)} primary={pattern.title} />
          </ListItemButton>
        </ListItem>

      ))}
    </List>
  )
}