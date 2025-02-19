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

function App() {
  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
