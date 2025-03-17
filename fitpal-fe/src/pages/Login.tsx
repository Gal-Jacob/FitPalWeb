import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Card } from '@mui/material';
import { AuthPagesProps, emailRegex, passwordLogInRegex } from './Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC<AuthPagesProps> = ({ onSwitchPage }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isDisabled = !emailRegex.test(email) || !passwordLogInRegex.test(password);

  const handleLogin = async () => {
    if (isDisabled) return;

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      }, {
        withCredentials: true,
    });

      const { token } = response.data;

      localStorage.setItem('token', token);

      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/user/google';
  };



  return (
      <Container maxWidth="sm">
        <Card sx={{ p: 4, mt: 8 }} >
          <Typography variant="h2" gutterBottom>Welcome to FitPal</Typography>
          <TextField sx={{ mt: 16 }}
            label="Email" 
            fullWidth 
            margin="normal" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            error={!!email && !emailRegex.test(email)}
            helperText={!!email && !emailRegex.test(email) ? 'Invalid email format' : ''}
          />
          <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
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
          onClick={handleGoogleLogin}
          >
          Continue with Google
          </Button>

        </Card>
      </Container>
  );
};


export default Login;