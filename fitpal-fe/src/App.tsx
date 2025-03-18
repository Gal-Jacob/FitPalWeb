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

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

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

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);

      navigate('/');
    }
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
          <Route path="/Login" element={<AuthPages  />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/NewPost" element={<NewPost />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
