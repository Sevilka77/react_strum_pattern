import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';

import { Share2Icon } from 'lucide-react';
import { ToggleButton } from '@mui/material';

async function copyToClip() {
  await navigator.clipboard.writeText(location.href);
}

export default function Share() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    copyToClip();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <div>
      <ToggleButton onClick={handleClick}><Share2Icon />  </ToggleButton>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={handleClose}
        message="link copied to clipboard!"
      />
    </div>
  );
}