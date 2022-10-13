import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Modal = ({ open, setopen, datain, setdatain, subclick }) => {
  const [data, setdata] = useState(datain);

  return (
    <Dialog open={open} sx={{ minWidth: '90vw', position: 'absolute' }}>
      <DialogTitle sx={{ backgroundColor: '#785EE0', color: 'white' }}>Subscribe</DialogTitle>
      <DialogContent sx={{}}>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
              <TextField
              autoFocus
              margin="dense"
              label="Data"
              type="email"
              fullWidth
              variant="standard"
            />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setopen(false) }}>Cancel</Button>
        <Button onClick={subclick} >Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal