import React, { useEffect, useState } from "react";
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
  Modal,
  Grid2,
  TextField,
  styled,
} from "@mui/material";
import NewPostButton from "./newPostButton/NewPostButton";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { IComment, IPost, IPostCommentsModalProps } from "../types";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import Badge, { badgeClasses } from "@mui/material/Badge";
import api from "../Api";
import { BACKEND_URL } from "../config";
import { isAxiosError } from "axios";
import Swal from "sweetalert2";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

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

interface IPostProps {
  props: IPost;
}

const TEMP_COMMENTS: IComment[] = [
  { author: "Alice", comment: "This is amazing!" },
  { author: "Bob", comment: "Great job, keep it up!" },
  { author: "Charlie", comment: "I have a question about this." },
  { author: "Diana", comment: "Really insightful, thanks for sharing." },
  { author: "Ethan", comment: "Could you provide more details?" },
  { author: "Fiona", comment: "I completely agree with you." },
  { author: "George", comment: "This helped me a lot, thank you!" },
  { author: "Hannah", comment: "I’m not sure I understand, can you clarify?" },
  { author: "Ian", comment: "This is exactly what I was looking for!" },
  { author: "Julia", comment: "Awesome work, well done!" },
  {
    author: "Kevin",
    comment: "Interesting perspective, I hadn't thought of that.",
  },
  { author: "Laura", comment: "Where did you find this information?" },
  { author: "Mike", comment: "I appreciate your hard work on this." },
  { author: "Nina", comment: "Can you share more examples?" },
  { author: "Oscar", comment: "This makes so much sense, thanks!" },
];

const PostCommentsModal: React.FC<IPostCommentsModalProps> = ({
  postId,
  closeModal,
  isOpen,
}) => {
  const [comments, setComments] = useState<IComment[]>();
  const [addComment, setAddComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(Boolean);

  const handleOnChangeComment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddComment(event.target.value);
  };

  useEffect(() => {
    api
      .get(`${BACKEND_URL}/api/post/comments?postId=${postId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: `Something went wrong while adding the post. Error: ${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
            {comments?.map((c: IComment, i) => {
              return (
                <Grid2 container>
                  <Grid2 size={1}>
                    <Avatar
                      sx={{
                        width: 25,
                        height: 25,
                        backgroundColor: "#4343f054",
                      }}
                    >
                      <PersonIcon
                        sx={{ width: 20, height: 20, color: "#4343f054" }}
                      />{" "}
                    </Avatar>
                  </Grid2>
                  <Grid2 size={10}>
                    <Typography
                      key={i}
                      id="modal-modal-title"
                      variant="body1"
                      component="h2"
                      sx={{ marginBottom: 1.25 }}
                    >
                      <b>{c.author}</b>
                      {c.comment}
                    </Typography>
                  </Grid2>
                </Grid2>
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
              fullwidth
              value={addComment}
              onChange={handleOnChangeComment}
            />
            <IconButton variant="contained" color="secondary">
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

const LikeButton: React.FC<IPostProps> = ({ props }) => {
  const [likes, setLikes] = useState(props.likes.length); // Initialize state

  const handleOnLikeClick = () => {
    api
      .put(`${BACKEND_URL}/api/post/like`, {
        postId: "67da401573652e360df14cb0",
      })
      .then((res) => {
        setLikes(res.data.users.length);
      })
      .catch((error) => {
        console.log(error.response?.data?.error || "Axios error occurred");
      });
  };

  return (
    <>
      <IconButton color="primary" aria-label="like" onClick={handleOnLikeClick}>
        <ThumbUpRoundedIcon />
        <CartBadge badgeContent={likes} color="primary" overlap="circular" />
      </IconButton>
    </>
  );
};

const Post: React.FC<IPostProps> = ({ props }) => {
  const [isCommentModalopen, setIsCommentModalopen] = useState<boolean>(false);
  const handleOpenCommentModal = () => setIsCommentModalopen(true);
  const handleCloseCommentModal = () => setIsCommentModalopen(false);

  const calculateTimeDifference = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const diffMs = end.getTime() - start.getTime(); // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // Convert to minutes
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <Container sx={{ mt: 4, width: 500 }}>
        <Typography variant="body1" gutterBottom>
          {props.author}
        </Typography>
        <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
          <CardContent>
            {props.imageUrl ? (
              <img src={props.imageUrl} alt="Dynamic image" />
            ) : (
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#4343f054",
                  margin: "auto",
                }}
              >
                <InsertPhotoIcon
                  sx={{ width: 80, height: 80, color: "white" }}
                />
              </Avatar>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 0,
              }}
            >
              <Typography variant="body1" gutterBottom>
                time: {calculateTimeDifference(props.startTime, props.endTime)}
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
              <LikeButton props={props} />
              <IconButton
                color="primary"
                aria-label="comment"
                onClick={handleOpenCommentModal}
              >
                <ChatBubbleOutlineRoundedIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <PostCommentsModal
        isOpen={isCommentModalopen}
        closeModal={handleCloseCommentModal}
        postId={props.id}
      />
    </>
  );
};

export default Post;
