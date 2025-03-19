import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Container,
  Grid2 as Grid,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import { Close, Person, Send } from "@mui/icons-material";
import { IComment, ICommentsModalProps } from "../types";
import CustomIconButton from "./CustomIconButton";

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

const CommentsModal: React.FC<ICommentsModalProps> = ({
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
          <div className="modal-header">
            <Typography
              variant="h5"
              sx={{
                marginBottom: 0,
                paddingBottom: "0px 20px 0px 20px",
                color: "black",
              }}
            >
              Comments
            </Typography>
            <CustomIconButton
              color="primary"
              aria-label="close"
              onClick={() => closeModal()}
            >
              <Close />
            </CustomIconButton>
          </div>
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
                      />
                    </Avatar>
                  </Grid>
                  <Grid size={10} sx={{ color: "black" }}>
                    <Typography
                      key={i}
                      id="modal-modal-title"
                      variant="body1"
                      component="h2"
                    >
                      <b>{comment.owner}</b>
                    </Typography>
                    <Typography sx={{ marginBottom: 1.25 }}>
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

export default CommentsModal;
