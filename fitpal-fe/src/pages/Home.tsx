import React, { useEffect, useState } from "react";
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
import { BACKEND_URL } from "../config";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/post/all`);
      setPosts(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Axios error occurred");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div id="home-page">
        {posts.map((post: IPost) => {
          return <Post key={post.id} props={post} />;
        })}
      </div>
      <NewPostButton />
    </>
  );
}
