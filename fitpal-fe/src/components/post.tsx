import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Avatar,
  Modal,
  Grid2,
  TextField,
  styled,
  IconButton,
} from "@mui/material";
import NewPostButton from "./newPostButton/NewPostButton";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { IComment, IPost, ICommentsModalProps } from "../types";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import Badge, { badgeClasses } from "@mui/material/Badge";
import api from "../Api";
import { BACKEND_URL } from "../config";
import { isAxiosError } from "axios";
import { ChatBubbleOutlineRounded } from "@mui/icons-material";
import CommentsModal from "./CommentsModal";

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

const PostCommentsModal: React.FC<ICommentsModalProps> = ({
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
                      <b>{comment.owner}</b>
                      {comment.text}
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
                <ChatBubbleOutlineRounded />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <CommentsModal
        isOpen={isCommentModalopen}
        closeModal={handleCloseCommentModal}
        postId={props.id}
      />
    </>
  );
};

export default Post;
