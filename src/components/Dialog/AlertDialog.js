import React from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// displaying error messages or alerts 
// pass in: alert={message, leftOption, rightOption}
// isOpen and setIsOpen 
// setAnswer is to return which option the user chose to the parent component 
export function AlertDialog({ alert, isOpen, setIsOpen, setAnswer }) {

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="dialog">
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle id="alert-dialog-title">
          {"Sign out alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alert.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button
            onClick={() => {
              setAnswer(false);
              handleClose();
            }}
            autoFocus
          >{alert.leftOption}</Button>

          <Button
            onClick={() => {
              setAnswer(true);
              handleClose();
            }}
            variant="contained">
            {alert.rightOption}
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}
