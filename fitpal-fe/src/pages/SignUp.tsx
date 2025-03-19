import React, { useState } from "react";
import { Button, TextField, Container, Typography, Card } from "@mui/material";
import { AuthPagesProps, emailRegex, passwordSignUpRegex } from "./Auth";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignUp: React.FC<AuthPagesProps> = ({ onSwitchPage }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isDisabled =
    firstName === "" ||
    lastName === "" ||
    !emailRegex.test(email) ||
    !passwordSignUpRegex.test(password);

  const handleSignUp = async () => {
    if (isDisabled) return;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Signup successful:", response.data);

      onSwitchPage();
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 8 }}>
        <Typography variant="h2" gutterBottom>
          Sign up to FitPal
        </Typography>
        <TextField
          sx={{ mt: 8 }}
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
          helperText={
            !!email && !emailRegex.test(email) ? "Invalid email format" : ""
          }
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!password && !passwordSignUpRegex.test(password)}
          helperText={
            !!password && !passwordSignUpRegex.test(password)
              ? "Invalid password format"
              : ""
          }
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          fullWidth
          disabled={isDisabled}
          onClick={handleSignUp}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        <Button variant="text" fullWidth sx={{ mt: 2 }} onClick={onSwitchPage}>
          Already have an account? Login
        </Button>
      </Card>
    </Container>
  );
};

export default SignUp;
