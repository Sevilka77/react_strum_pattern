import { patterns } from "../patterns"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';





export default function PatternList({ onPatternChanged }) {



  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,

        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,

      }}
    >
      {patterns.map((pattern) => (
        <ListItem key={pattern.title} disablePadding>
          <ListItemButton onClick={() => onPatternChanged(pattern)} >
            <ListItemText primary={pattern.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}