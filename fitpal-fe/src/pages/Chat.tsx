import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, List, ListItem, ListItemText, Paper, Box, Avatar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { io, Socket } from "socket.io-client"; 

interface Message {
  id: string;
  text: string;
  sender: string;
}

const ChatRoom: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { chat } = location.state || {}
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io("http://localhost:8000")

    socketRef.current.on("connect", () => {
        console.log("Connected to WebSocket");
        
        if (chat?.id) {
          socketRef.current?.emit("fetchMessages", chat.id)
        }
      })
    
      socketRef.current.on("chatMessages", (data) => {
        if (data.success) {
          setMessages(data.messages);
        } else {
          console.error(`Error ${data.status}: ${data.error}`)
        }
      })

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: uuidv4(),
        text: newMessage,
        sender: "You",
      };

      socketRef.current?.emit("chat", newMsg);

      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        padding: 2 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          width: '1200px',
          height: '75vh',     
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          padding: 0, 
        }}
      >
        <Paper 
          style={{ 
            display: 'flex', 
            backgroundColor: '#8179f3', 
            paddingLeft: 10,
            paddingRight: 10, 
            paddingTop: 20, 
            paddingBottom: 20,
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}
        >
          <div style={{ display: 'flex' }}> 
            <Avatar sx={{ height: '56px', width: '56px' }}>
              {chat?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h3" sx={{ textAlign: 'center', marginLeft: '20px', color: "white" }}>
              {chat?.name || "No Chat Selected"}
            </Typography>
          </div>
          <IconButton onClick={handleBack} sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
        </Paper>

        <div 
          style={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            marginBottom: 10, 
            padding: '10px'
          }}
        >
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} style={{ flexDirection: message.sender === "You" ? "row-reverse" : "row" }}>
                <ListItemText
                  primary={message.text}
                  secondary={message.sender}
                  sx={{
                    textAlign: message.sender === "You" ? "right" : "left",
                    maxWidth: "70%",
                    margin: "5px 0"
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>

        {/* Input field and Send button */}
        <div style={{ display: "flex", alignItems: "center", padding: '10px' }}>
          <TextField
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            sx={{ marginRight: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

export default ChatRoom;
