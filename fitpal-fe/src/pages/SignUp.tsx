import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Card } from '@mui/material';
import { AuthPagesProps, emailRegex, passwordSignUpRegex } from './Auth';

const SignUp: React.FC<AuthPagesProps> = ({ onSwitchPage }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');



  const isDisabled =
      firstName === '' ||
      lastName === '' ||
      !emailRegex.test(email) ||
      !passwordSignUpRegex.test(password);

  const handleSignUp = () => {
      if (!isDisabled) {
          onSwitchPage();
      }
  };

  return (
      <Container maxWidth="sm">
          <Card sx={{ p: 4, mt: 8 }}>
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
                  error={!!password && !passwordSignUpRegex.test(password)}
                  helperText={!!password && !passwordSignUpRegex.test(password) ? 'Password must be at least 8 characters long and contain at least one letter and one number' : ''}
              />
              <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={handleSignUp}
                  disabled={isDisabled}
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
          </Card>
      </Container>
  );
};

export default SignUp;