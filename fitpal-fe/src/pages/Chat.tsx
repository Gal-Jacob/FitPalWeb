// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, List, ListItem, ListItemText, Paper, Box, Avatar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { io, Socket } from "socket.io-client"; 
import { EMAIL_LS, WEB_SOCKET_URL } from "../config";


interface Message {
  text: string;
  sender: string;
}

const ChatRoom: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { chat } = location.state || {};
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(WEB_SOCKET_URL);

    socketRef.current.on("connect", () => {

        console.log("Connected to WebSocket");

        if (chat?.id) {
            socketRef.current?.emit("joinChat", chat.id)
            socketRef.current?.emit("fetchMessages", chat.id)
        }
      })
    
      socketRef.current.on("chatMessages", (data) => {
        if (data.success) {
            const parsedMessages: Message[] = data.messages.map((message: any) => {
                const senderFinal = message.sendingUser === localStorage.getItem(EMAIL_LS) ? "You" : chat?.name
            return {
                text: message.text,
                sender: senderFinal,
                }
            });
        setMessages(parsedMessages);
        } else {
          console.error(`Error ${data.status}: ${data.error}`)
        }
      })


      socketRef.current.on("newMessage", (data) => {
        if (data.success) {
            const parsedMessages: Message[] = data.messages.map((message: any) => {
                const senderFinal = message.sendingUser === localStorage.getItem(EMAIL_LS) ? "You" : chat?.name
            return {
                text: message.text,
                sender: senderFinal,
                }
            });
            setMessages(parsedMessages);
        } else {
            console.error(`Error ${data.status}: ${data.error}`)
        }
      })

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    const currentNewMessage = newMessage.trim();

    if (currentNewMessage.length > 0) {
        socketRef.current?.emit("sendMessage", chat?.id, currentNewMessage, localStorage.getItem(EMAIL_LS) as string);
        // setMessages([...messages, { text: currentNewMessage, sender: "You" }]);
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "1200px",
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        <Paper
          style={{
            display: "flex",
            backgroundColor: "#8179f3",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar sx={{ height: "56px", width: "56px" }}>
              {chat?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
              variant="h3"
              sx={{ textAlign: "center", marginLeft: "20px", color: "white" }}
            >
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
            overflowY: "auto",
            marginBottom: 10,
            padding: "10px",
          }}
        >
          <List>

            {messages.map((message, index) => (
              <ListItem key={index} style={{ flexDirection: message.sender === "You" ? "row-reverse" : "row" }}>


                <ListItemText
                  primary={message.text}
                  secondary={message.sender}
                  sx={{
                    textAlign: message.sender === "You" ? "right" : "left",
                    maxWidth: "70%",
                    margin: "5px 0",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>

        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <TextField
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

export default ChatRoom;
