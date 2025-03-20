import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Avatar,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";
import { InsertPhoto, Edit } from "@mui/icons-material";

import { IProfile } from "../types";
import NewPostButton from "../components/newPostButton/NewPostButton";
import PostsView from "../components/PostsView";
import WorkoutView from "../components/WorkoutView";
import { BACKEND_URL } from "../config";
import api from "../Api";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<IProfile>({
    postId: "",
    name: "",
    email: "",
    gender: "",
    height: "",
    weight: "",
    image: "",
  });
  const [view, setView] = React.useState<"workout" | "posts">("workout");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await api.get(`${BACKEND_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
  
        setUserProfile({
          postId: response.data.postId || "",
          name: `${response.data.firstName || ""} ${response.data.lastName || ""}`,
          email: response.data.email || "",
          gender: response.data.gender || "",
          height: response.data.height || "",
          weight: response.data.weight || "", 
          image: response.data.image || "",
        });


      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Failed to fetch user profile. Please try again.");
      }
    };
  
    fetchUserProfile();
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: "workout" | "posts"
  ) => {
    setView(newView);
  };

  const handleOnClickEditProfile = (event: React.MouseEvent<HTMLElement>) => {
    navigate(`/EditProfile`);
  };

  return (
    <div>
      <Container
        sx={{
          mt: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "20px",
          height: "10vh",
          minWidth: "100%",
        }}
      >
        <Avatar
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "#4343f054",
            border: "2px solid #ddd",
          }}
          src={userProfile.image || undefined}
        >
          {!userProfile.image && (
            <InsertPhoto sx={{ width: 80, height: 80, color: "white" }} />
          )}
        </Avatar>
        <Box>
          <Typography variant="h5">{userProfile.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            Height: {userProfile.height || "N/A"} cm
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Weight: {userProfile.weight || "N/A"} kg
          </Typography>
        </Box>
        <IconButton
          color="primary"
          aria-label="like"
          onClick={handleOnClickEditProfile}
        >
          <Edit />
        </IconButton>
      </Container>
      <ToggleButtonGroup
        color="primary"
        value={view}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="workout">Workout</ToggleButton>
        <ToggleButton value="posts">Posts</ToggleButton>
      </ToggleButtonGroup>
      <Container
        sx={{
          height: "50vh",
          minWidth: "73vw",
        }}
      >
        {view == "workout" ? <WorkoutView /> : <PostsView />}
      </Container>
      <NewPostButton />
    </div>
  );
};

export default Profile;
