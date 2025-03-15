import { Grid2 } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_WSS_SERVER_URL);

const Chatpage: React.FC = () => {
   const [currentMessage,  setCurrentMessage] = useState<string>('');
   const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
   const [chatsHistory, setChatsHistory] = useState<{id: string}[]>([]);


   useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    
    }, []);


  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = { id: Date.now().toString(), text: currentMessage };
      socket.emit("message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setCurrentMessage("");
    }
  };

  return (
    <Grid2 container sx={{ width: '100vmin', minHeight: '850px', backgroundColor: 'white', borderRadius: '15px' }}>
        <Grid2 size={9}>
            <h1>test2</h1>
        </Grid2>
        <Grid2 size={3} sx={{ borderLeft: '1px solid black' }}>
            
        </Grid2>
    </Grid2>
  )
}

export default Chatpage;