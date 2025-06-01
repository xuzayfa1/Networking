import { Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';

function Notification({ message, severity, open, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
export default Notification;
