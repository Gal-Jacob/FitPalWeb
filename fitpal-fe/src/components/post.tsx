import React, { useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Avatar,
} from "@mui/material";
import {
  ThumbUpRounded,
  ChatBubbleOutlineRounded,
  InsertPhoto,
} from "@mui/icons-material";

import { IPostProps } from "../types";
import "./components.css";
import CustomIconButton from "./CustomIconButton";
import CommentsModal from "./CommentsModal";

const Post: React.FC<IPostProps> = ({ props }) => {
  const [isCommentModalopen, setIsCommentModalopen] = useState<boolean>(false);
  const handleOpenCommentModal = () => setIsCommentModalopen(true);
  const handleCloseCommentModal = () => setIsCommentModalopen(false);

  return (
    <>
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
              <InsertPhoto sx={{ width: 80, height: 80, color: "white" }} />
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
              <CustomIconButton color="primary" aria-label="like">
                <ThumbUpRounded />
              </CustomIconButton>
              <CustomIconButton
                color="primary"
                aria-label="comment"
                onClick={handleOpenCommentModal}
              >
                <ChatBubbleOutlineRounded />
              </CustomIconButton>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <CommentsModal
        isOpen={isCommentModalopen}
        closeModal={handleCloseCommentModal}
        postId={props.postId}
      />
    </>
  );
};

export default Post;
