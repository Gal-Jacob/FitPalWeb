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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import NewPostButton from "../components/newPostButton/NewPostButton";
import { IPost } from "../types";
import { BACKEND_URL } from "../config";
import api from "../Api";
import { isAxiosError } from "axios";
import Swal from "sweetalert2";
import Post from "../components/post";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    setLoading(true);
    setTimeout(() => {
      api
        .get(`${BACKEND_URL}/api/post/all`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((error) => {
          if (isAxiosError(error)) {
            setError(error.response?.data?.error || "Axios error occurred");
          } else if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) {
    return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        width: "100%", 
      }}
    >
    <CircularProgress /> 
  </div>
  )}
  if (error) {
    Swal.fire({
      title: "Error!",
      text: `Something went wrong while adding the post. Error: ${error}`,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

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
export default Home;
