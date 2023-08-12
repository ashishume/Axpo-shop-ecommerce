import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { SNACKBAR_TIMEOUT } from '../../constants/snackbar';
const CustomSnackbar = ({ message = '', isError = false }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Snackbar
      message={message}
      open={isOpen}
      autoHideDuration={SNACKBAR_TIMEOUT - 1500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      {isError ? (
        <Alert severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      ) : (
        <Alert severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default CustomSnackbar;
