import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./NewPostButton.css";

export default function NewPostButton() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/NewPost`);
  };

  return (
    <Button variant="contained" id="new-post-button" onClick={handleOnClick}>
      New Post
    </Button>
  );
}
