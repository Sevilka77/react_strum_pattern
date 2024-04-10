import { patterns } from "../patterns"
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';





export default function PatternList({ onPatternChanged }) {



  return (
    <Masonry columns={4} spacing={1}
    >
      {patterns.map((pattern) => (
        <Button key={pattern.title} variant="contained" onClick={() => onPatternChanged(pattern)}>{pattern.title}</Button>
      ))}
    </Masonry>
  )
}