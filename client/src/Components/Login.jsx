import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate()

  const [data, setdata] = useState({
    email: "",
    password: ""
  });
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.password) return alert('Email and Password are required!')

    try {
      const response = await axios.post('/api/auth', { email: data.email, password: data.password })
      // console.log(response.data);
      localStorage.setItem('user',JSON.stringify(response.data))
      navigate('/main')
    } catch (err) {
      alert(err.response.data)
    }
    //   axios.post('/api/auth',{email:data.email,password:data.password})
    //    .then(response=>{
    //     if(response.status == 200){
    //       console.log(response.data)
    //     }
    //    }).catch(err=> alert(err.response.data))
    //   document.getElementById('form').reset()
    };

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#785EE0' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" id='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setdata(ps => ({ ...ps, email: e.target.value }))}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setdata(ps => ({ ...ps, password: e.target.value }))}
              />
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2, bgcolor:'#785EE0', color:'white' }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  export default Login