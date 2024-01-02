import Button from '@mui/material/Button';
import { Stack } from '@mui/system'
export default function IncDec({ label, onInc, onDec }) {
  return (
    <Stack direction="row" gap={1} >
      <Button variant="outlined" onClick={onDec} >
        -
      </Button>
      <p>{label}</p>
      <Button variant="outlined" onClick={onInc} >
        +
      </Button>
    </Stack>
  );
}