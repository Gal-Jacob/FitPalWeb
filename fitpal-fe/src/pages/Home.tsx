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
import NewPostButton from "../components/newPostButton/NewPostButton";

export default function Home() {
  return (
    <>
      <div>
        <Container sx={{ mt: 4 }}>
          <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Home
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </div>
      <NewPostButton />
    </>
  );
}
