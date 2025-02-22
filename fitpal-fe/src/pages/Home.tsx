import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import NewPostButton from "../components/newPostButton/NewPostButton";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { IPost } from "../types";
import Post from "../components/post";

const temp: IPost[] = [
  {
    owner: "Gal Yaakov",
    photo: "",
    title: "Workout finished",
    time: "1:15:00",
    workout: "Full Body",
    details: "Today was a good Workout",
  },
  {
    owner: "Yoav David",
    photo: "",
    title: "Workout finished",
    time: "1:15:00",
    workout: "Upper Body",
    details: "Today was a good Workout",
  },
  {
    owner: "Ido Sharon",
    photo: "",
    title: "Workout finished",
    time: "4:15:00",
    workout: "Only ass",
    details: "Today was a good Workout",
  },
];

export default function Home() {
  return (
    <>
      <div id="home-page">
        {temp.map((post: IPost) => {
          return <Post props={post} />;
        })}
      </div>
      <NewPostButton />
    </>
  );
}
