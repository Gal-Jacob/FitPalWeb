import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import NewPostButton from "../components/newPostButton/NewPostButton";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { IPost } from "../types";

interface IPostProps {
  props: IPost;
}

const Post: React.FC<IPostProps> = ({ props }) => {
  return (
    <Container sx={{ mt: 4, width: 500 }}>
      <Typography variant="body1" gutterBottom>
        {props.owner}
      </Typography>
      <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
        <CardContent>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              backgroundColor: "#4343f054",
              margin: "auto",
            }}
          >
            {props.photo}
            <InsertPhotoIcon sx={{ width: 80, height: 80, color: "white" }} />
          </Avatar>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            {props.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 0,
            }}
          >
            <Typography variant="body1" gutterBottom>
              {props.time}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.workout}
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom>
            {props.details}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 0,
            }}
          >
            <IconButton color="primary" aria-label="like">
              <ThumbUpRoundedIcon />
            </IconButton>
            <IconButton color="primary" aria-label="comment">
              <ChatBubbleOutlineRoundedIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Post;
