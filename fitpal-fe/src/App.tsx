import "./App.css";
import NavBar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import NewPost from "./pages/NewPost";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthPages from "./pages/Auth";
import { useEffect } from "react";
import Chatroom from "./pages/Chat";
import axios from "axios";

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

import { EMAIL_LS, TOKEN_LS } from "./config";
<<<<<<< HEAD
=======
import { TOKEN_LS, EMAIL_LS } from "./config";
>>>>>>> 182363086e1d3072766c599e5155595aec3ab5fb
import api from "./Api";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8179f3",
    },
    secondary: {
      main: "#03a9f4",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
});

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    const checkTokenAndFetchProfile = async () => {
=======
      const checkTokenAndFetchProfile = async () => {
>>>>>>> 182363086e1d3072766c599e5155595aec3ab5fb
      const token = localStorage.getItem("token") || new URLSearchParams(window.location.search).get("token");

      if (!token) {
        navigate("/login");
        return;
<<<<<<< HEAD
      }

      
      if (!localStorage.getItem("token") && token) {
        localStorage.setItem("token", token);
        navigate("/"); 
        return;
      }

      
=======
      }

      if (!localStorage.getItem("token") && token) {
        localStorage.setItem("token", token);
        navigate("/");
        return;
      }

>>>>>>> 182363086e1d3072766c599e5155595aec3ab5fb
      try {
        const response = await api.get(`${BACKEND_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem(EMAIL_LS, response.data.email);
      } catch (error) {
        console.error(error);
<<<<<<< HEAD
        localStorage.removeItem("token"); 
        navigate("/login"); 
=======
        localStorage.removeItem("token");
        navigate("/login");
>>>>>>> 182363086e1d3072766c599e5155595aec3ab5fb
      }
    };

    checkTokenAndFetchProfile();
  }, [navigate]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Login" element={<AuthPages />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/NewPost" element={<NewPost />} />
          <Route path="/chat/:chatId" element={<Chatroom />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;