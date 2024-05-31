

import Snackbar from '@mui/material/Snackbar';
import { createSvgIcon } from '@mui/material/utils';

import { IconButton } from '@mui/material';
import { useState } from 'react';




const ShareIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
  </svg>,
  'ShareIcon',
);

async function copyToClip() {
  await navigator.clipboard.writeText(location.href);
}

export default function Share() {
  const [open, setOpen] = useState(false);
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
      <IconButton sx={{ fontSize: "40px", borderRadius: "50%", border: "1px solid #f5f5f5" }} value="chplayeck" onClick={handleClick}> <ShareIcon fontSize="inherit" /></IconButton>
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