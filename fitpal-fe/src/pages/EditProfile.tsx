import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";

export default function EditProfile() {
  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Edit Profile
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
