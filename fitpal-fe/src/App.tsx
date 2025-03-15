import { useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import NewPost from "./pages/NewPost";
import SignUp from "./pages/SignUp";
import Chatpage from "./pages/chat";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8179f3", // Change this to your desired primary color
    },
    secondary: {
      main: "#03a9f4", // Change this to your desired secondary color
    },
    background: {
      default: "#f5f5f5", // Change background color
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/NewPost" element={<NewPost />} />
          <Route path="/Chats" element={<Chatpage/>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
