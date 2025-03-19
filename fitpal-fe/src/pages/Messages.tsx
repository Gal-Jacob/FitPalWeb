import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Container, Button, Popper, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { EMAIL_LS, WEB_SOCKET_URL } from "../config";
import api from "../Api";
import Swal from 'sweetalert2';


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

  const checkChatExists = (name: string): boolean => {
    return chats.some(chat => chat.name === name);
  };

  const handleAddClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setShowInput((prev) => !prev);
  };

  const moveToChatRoom = (clickedChatData: LastChatInfo) => {
    navigate(`/chat/${clickedChatData.id}`, { state: { chat: clickedChatData } });  
  }

  const addNewChat = async () => {
    try {

      if (checkChatExists(addedUsername)) { 
        Swal.fire({
          icon: 'info',
          title: 'Chat Already Exists',
          text: 'You already have a chat with this user.',
        });
        setShowInput(false);
        return;
      }

      const response = await (await api.get(`/api/user/findUserByEmail?email=${addedUsername}`)).data;
      
      if (!response) {
        Swal.fire({
          icon: 'error',
          title: 'User Not Found',
          text: 'The user could not be found. Please try another username.',
        });
        return;
      }
  
      socketRef.current?.emit("createChat", localStorage.getItem(EMAIL_LS), addedUsername);
  
      socketRef.current?.on("chatCreated", (data) => {
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Chat Created!',
            text: 'Your chat with this user has been created.',
          });
          const lastMessage = Array.isArray(data.messages) && data.messages.length > 0 
    ? data.messages[data.messages.length - 1] 
    : 'No messages yet';
          
         console.log(data)
          const newChat: LastChatInfo = { id: data.chat.id, lastMessages: lastMessage, name: addedUsername };
          debugger
          setChats([...chats, newChat]);
          setShowInput(false);
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Create Chat',
            text: 'Something went wrong. Please try again later.',
          });
        }
      });
      socketRef.current?.on("chatError", (data) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'An error occurred while creating the chat.',
        });
      });
  
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };

    const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io(WEB_SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket")
      });
  

    socketRef.current?.emit("fetchUserChats", localStorage.getItem(EMAIL_LS));
    
    socketRef.current?.on("userChats", (data) => {
      if (data.success) {
        data.chats.forEach((currentChat: any) => {
          const lastMessage = Array.isArray(currentChat.messages) && currentChat.messages.length > 0 
            ? currentChat.messages[currentChat.messages.length - 1].text 
            : 'No messages yet';
            debugger
          const newChat: LastChatInfo = { id: currentChat.id, lastMessages: lastMessage, name: currentChat.users[1] };
          setChats((prev) => [...prev, newChat]);
        })        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to fetch Chats',
          text: 'Something went wrong. Please try again later.',
        });
      }
    });

  return () => {
    socketRef.current?.disconnect();
  };
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
            label="Enter user email"
            variant="outlined"
            value={addedUsername}
            onChange={(e) => setAddedUsername(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={addNewChat}
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
