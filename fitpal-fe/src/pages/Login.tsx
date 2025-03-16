import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Card } from '@mui/material';
import { AuthPagesProps } from './Auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<AuthPagesProps> = ({ onSwitchPage }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const isDisabled = email === '' || password === '';

  const handleLogin = () => {
      if (!isDisabled) {
          navigate('/'); 
      }
  };

  return (
      <Container maxWidth="sm">
        <Card sx={{ p: 4, mt: 8 }}>
          <Box sx={{ mt: 8 }}>
              <Typography variant="h2" gutterBottom>Welcome to FitPal</Typography>
              <TextField 
                  sx={{mt: 16}}
                  label="Email" 
                  fullWidth 
                  margin="normal" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
              />
              <TextField 
                  label="Password" 
                  type="password" 
                  fullWidth 
                  margin="normal" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
              />
              <Button 
                  variant="contained" 
                  fullWidth 
                  disabled={isDisabled}
                  onClick={handleLogin}
                  sx={{ mt: 2 }}
              >
                  Login
              </Button>
              
              <Button 
                  variant="text" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={onSwitchPage}
              >
                  Don't have an account? Sign Up
              </Button>
              <Typography sx={{mt: 4}} variant="h4" gutterBottom>OR</Typography>
              <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ mt: 2 }}
              >
                  Continue with Google
              </Button>

          </Box>
          </Card>
      </Container>
  );
};


export default Login;