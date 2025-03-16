import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Card } from '@mui/material';
import { AuthPagesProps } from './Auth';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC<AuthPagesProps> = ({ onSwitchPage }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignUp = () => {
      navigate('/Login');
  };

  return (
      <Container maxWidth="sm">
        <Card sx={{ p: 4, mt: 8 }}>
          <Box sx={{ mt: 8 }}>
              <Typography variant="h4" gutterBottom>Sign Up</Typography>
              <TextField 
                  label="First Name" 
                  fullWidth 
                  margin="normal" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField 
                  label="Last Name" 
                  fullWidth 
                  margin="normal" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)}
              />
              <TextField 
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
                  onClick={handleSignUp}
                  sx={{ mt: 2 }}
              >
                  Sign Up
              </Button>
              <Button 
                  variant="text" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={onSwitchPage}
              >
                  Already have an account? Login
              </Button>
          </Box>
          </Card>
      </Container>
  );
};

export default SignUp;