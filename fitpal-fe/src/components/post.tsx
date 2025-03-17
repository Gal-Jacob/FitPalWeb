import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  IconButton,
  Avatar,
  Modal,
  Grid2 as Grid,
  TextField,
} from "@mui/material";
import { IComment, IPostCommentsModalProps, IPostProps } from "../types";
import {
  ThumbUpRounded,
  ChatBubbleOutlineRounded,
  InsertPhoto,
  Person,
  Send,
} from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  // p: 4,
};

const TEMP_COMMENTS: IComment[] = [
  { owner: "Alice", text: "This is amazing!" },
  { owner: "Bob", text: "Great job, keep it up!" },
  { owner: "Charlie", text: "I have a question about this." },
  { owner: "Diana", text: "Really insightful, thanks for sharing." },
  { owner: "Ethan", text: "Could you provide more details?" },
  { owner: "Fiona", text: "I completely agree with you." },
  { owner: "George", text: "This helped me a lot, thank you!" },
  { owner: "Hannah", text: "I’m not sure I understand, can you clarify?" },
  { owner: "Ian", text: "This is exactly what I was looking for!" },
  { owner: "Julia", text: "Awesome work, well done!" },
  {
    owner: "Kevin",
    text: "Interesting perspective, I hadn't thought of that.",
  },
  { owner: "Laura", text: "Where did you find this information?" },
  { owner: "Mike", text: "I appreciate your hard work on this." },
  { owner: "Nina", text: "Can you share more examples?" },
  { owner: "Oscar", text: "This makes so much sense, thanks!" },
];

const PostCommentsModal: React.FC<IPostCommentsModalProps> = ({
  postId,
  closeModal,
  isOpen,
}) => {
  const [comments, setComments] = useState<IComment[]>();
  const [addComment, setAddComment] = useState<string>("");

  const handleOnChangeComment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddComment(event.target.value);
  };

  useEffect(() => {
    //TODO: Load comments
    setComments(TEMP_COMMENTS);
  }, []);

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box sx={style}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 0,
              padding: "20px 20px 0px 20px",
            }}
          >
            Comments
          </Typography>
          <Container sx={{ overflowY: "auto", height: 240 }}>
            {comments?.map((comment, i) => {
              return (
                <Grid container>
                  <Grid size={1}>
                    <Avatar
                      sx={{
                        width: 25,
                        height: 25,
                        backgroundColor: "#4343f054",
                      }}
                    >
                      <Person
                        sx={{ width: 20, height: 20, color: "#4343f054" }}
                      />{" "}
                    </Avatar>
                  </Grid>
                  <Grid size={10}>
                    <Typography
                      key={i}
                      id="modal-modal-title"
                      variant="body1"
                      component="h2"
                      sx={{ marginBottom: 1.25, color: "black" }}
                    >
                      <b>{comment.owner}</b>
                      {comment.text}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              gap: "10px",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              label="add comment"
              variant="outlined"
              fullWidth
              value={addComment}
              onChange={handleOnChangeComment}
            />
            <IconButton color="secondary">
              <Send />
            </IconButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

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
              <IconButton color="primary" aria-label="like">
                <ThumbUpRounded />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="comment"
                onClick={handleOpenCommentModal}
              >
                <ChatBubbleOutlineRounded />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <PostCommentsModal
        isOpen={isCommentModalopen}
        closeModal={handleCloseCommentModal}
        postId={props.postId}
      />
    </>
  );
};

export default Post;
