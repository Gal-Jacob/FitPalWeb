import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Avatar,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { InsertPhoto, Edit } from "@mui/icons-material";

import { IProfile } from "../types";
import NewPostButton from "../components/newPostButton/NewPostButton";
import PostsView from "../components/PostsView";
import WorkoutView from "../components/WorkoutView";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<IProfile>({
    postId: "1",
    name: "Gal Yaakov",
    email: "GalYaakov100@gmail.com",
    gender: "male",
    height: "179cm",
    whight: "100kg",
    photo: "",
  });
  const [view, setView] = React.useState<"workout" | "posts">("workout");

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
          mt: 3,
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
          }}
        >
          {userProfile.photo ? (
            userProfile.photo
          ) : (
            <InsertPhoto sx={{ width: 80, height: 80, color: "white" }} />
          )}
        </Avatar>
        <Typography variant="h5">{userProfile.name}</Typography>
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
