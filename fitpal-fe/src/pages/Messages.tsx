import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Container, Button, Popper, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { io, Socket } from "socket.io-client";

export type LastChatInfo = {
  id: string;
  name: string;
  lastMessages: string;
};

const Messages: React.FC = () => {
  const [chats, setChats] = useState<LastChatInfo[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [addedUsername, setAddedUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleAddClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setShowInput((prev) => !prev);
  };

  const moveToChatRoom = (clickedChatData: LastChatInfo) => {
    navigate(`/chat/${clickedChatData.id}`, { state: { chat: clickedChatData } });  
  }

  const addNewChat = (currentChatOtherUser: string) => {
    socketRef.current?.emit("createChat",currentChatOtherUser, localStorage.getItem("email"))
  }

  const handleSubmit = () => {
    if (addedUsername.trim()) {
      console.log("New username:", addedUsername);
      setAddedUsername("");
      setShowInput(false);
      setAnchorEl(null);
    }
  };

    const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io("http://localhost:8000")

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket")
    })
  
  return () => {
    socketRef.current?.disconnect();
  };
    // const newChat: LastChatInfo = { id: uuidv4(), lastMessages: 'hi', name: 'ido' };
    // setChats([...chats, newChat]);
  }, []);

  return (
    <Container sx={{ width: '100vw', marginTop: '15%', height: '75vh' }}>
      <Card sx={{ mx: "auto", p: 2, minHeight: '800px', maxHeight: '800px' }}>
        <CardContent sx={{ height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
            <Typography variant="h3" gutterBottom>
            Your chats
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddClick}>
             +
            </Button>
            <Popper open={showInput} anchorEl={anchorEl} placement="bottom-start">
        <Paper style={{ padding: "10px", display: "flex", gap: "10px" }}>
          <TextField
            label="Enter Username"
            variant="outlined"
            value={addedUsername}
            onChange={(e) => setAddedUsername(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </Popper>
          </div>
          <Divider sx={{ marginBottom: 2, height: 4, borderBottomWidth: 4 }} />
          {chats.length > 0 ? (
            <List>
              {chats.map((chat: LastChatInfo) => (
                <React.Fragment key={chat.id}>
                  <ListItem onClick={() => moveToChatRoom(chat)}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 56, height: 56 }}>{chat.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
     sx={{ marginLeft: 5 }}
  primary={
    <Typography component="span" variant="h4" sx={{ display: 'block' }}>
      {chat.name}
    </Typography>
  }
  secondary={
    <Typography component="span" variant="body1" color="textPrimary" sx={{ fontSize: 22, display: 'block' }}>
      {chat.lastMessages}
    </Typography>
  }
/>
                  </ListItem>
                  <Divider flexItem sx={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', fontSize: 16 }} />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", gap: '15px' }}>
              <Typography variant="h5">Oops, seems like you don't have any active chats :(</Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Messages;
