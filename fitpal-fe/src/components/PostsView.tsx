// @ts-nocheck

import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { InsertPhoto } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IPost } from "../types";
import Post from "./Post";
import api from "../Api";
import { BACKEND_URL } from "../config";
import { isAxiosError } from "axios";
import Swal from "sweetalert2";

const PostsView: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([
    {
      _id: "67da401573652e360df14cb0",
      author: "Gal Yaakov",
      startTime: "2025-03-18T22:05:00.000Z",
      endTime: "2025-03-18T22:15:00.000Z",
      workout: "FullBody",
      details: "asdasd",
      imageUrl: "http://localhost:5000/post-assets/1742356501163.png",
      likes: ["114724747635645575543", "galgol@gamil.com"],
      comments: [
        {
          author: "114724747635645575543",
          comment: "asdasd",
          _id: "67daf565c8315790c6e9d98a",
        },
        {
          author: "114724747635645575543",
          comment: "asdasdasdasd",
          _id: "67daf568c8315790c6e9d990",
        },
        {
          author: "114724747635645575543",
          comment: "asdasdasdasdadasdsa",
          _id: "67daf56ac8315790c6e9d998",
        },
        {
          author: "114724747635645575543",
          comment: "asdasdasdasdadasdsaasdasd",
          _id: "67daf57cc8315790c6e9d9a2",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "aaa",
          _id: "67daf6328ce3de5d74fe2135",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "asd",
          _id: "67daf7a78ce3de5d74fe215d",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "asd",
          _id: "67daf7a88ce3de5d74fe216d",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "asd",
          _id: "67daf7a98ce3de5d74fe217f",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "asd",
          _id: "67daf7aa8ce3de5d74fe2193",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "asdasd",
          _id: "67daf7ac8ce3de5d74fe21a9",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "s",
          _id: "67daf7ad8ce3de5d74fe21c1",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "s",
          _id: "67daf7ae8ce3de5d74fe21db",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "s",
          _id: "67daf7af8ce3de5d74fe21f7",
        },
        {
          author: "gal.yaakov100@gmail.com",
          comment: "s",
          _id: "67daf7b18ce3de5d74fe2215",
        },
        {
          author: "galgol@gamil.com",
          comment: "asdasd",
          _id: "67daf84d8ce3de5d74fe228a",
        },
        {
          author: "galgol@gamil.com",
          comment: "sdf",
          _id: "67daf8848ce3de5d74fe2300",
        },
        {
          author: "galgol@gamil.com",
          comment: "sdf",
          _id: "67daf8d98ce3de5d74fe242c",
        },
        {
          author: "galgol@gamil.com",
          comment: "676",
          _id: "67daf8ee8ce3de5d74fe2452",
        },
      ],
      id: "36a7b4a5-477f-4c85-b567-eb316285a271",
      createdAt: "2025-03-19T03:55:01.174Z",
      updatedAt: "2025-03-19T17:16:24.659Z",
      __v: 88,
    },
    {
      _id: "67da405273652e360df14cb2",
      author: "Gal Yaakov",
      startTime: "2025-03-18T22:00:00.000Z",
      endTime: "2025-03-18T22:00:00.000Z",
      workout: "FullBody",
      details: ";",
      imageUrl: "http://localhost:5000/post-assets/1742356562878.png",
      likes: [],
      comments: [
        {
          author: "114724747635645575543",
          comment: "HHHHHHHH",
          _id: "67daf31691a86ed3f87923d5",
        },
        {
          author: "114724747635645575543",
          comment: "HHHHHHHH",
          _id: "67daf32bc8315790c6e9d940",
        },
        {
          author: "114724747635645575543",
          comment: "HHHHHHHH",
          _id: "67daf32dc8315790c6e9d948",
        },
        {
          author: "114724747635645575543",
          comment: "HHHHHHHH",
          _id: "67daf441c8315790c6e9d952",
        },
      ],
      id: "151fe03b-70f7-4ac7-8666-213827dadf8e",
      createdAt: "2025-03-19T03:56:02.881Z",
      updatedAt: "2025-03-19T16:43:45.575Z",
      __v: 10,
    },
    {
      _id: "67da40b273652e360df14cb6",
      author: "Gal Yaakov",
      startTime: "2025-03-18T22:00:00.000Z",
      endTime: "2025-03-19T01:00:00.000Z",
      workout: "UpperBody",
      details: "asd",
      imageUrl: "http://localhost:5000/post-assets/1742356658090.png",
      likes: ["galgol@gamil.com"],
      comments: [
        {
          author: "galgol@gamil.com",
          comment: "sadsdf",
          _id: "67dafa42ec35fc36b9f94ca1",
        },
        {
          author: "galgol@gamil.com",
          comment: "sdfsdfsdf",
          _id: "67dafa44ec35fc36b9f94ca7",
        },
        {
          author: "galgol@gamil.com",
          comment: "sdfsdfdsf",
          _id: "67dafa46ec35fc36b9f94caf",
        },
      ],
      id: "626a01f9-e3ba-4d93-a023-ec277361f9a2",
      createdAt: "2025-03-19T03:57:38.093Z",
      updatedAt: "2025-03-19T17:18:01.743Z",
      __v: 4,
    },
    {
      _id: "67dafb85ec35fc36b9f95087",
      author: "Gal Yaakov",
      startTime: "2025-03-18T22:00:00.000Z",
      endTime: "2025-03-19T01:00:00.000Z",
      workout: "FullBody",
      details: "asd",
      imageUrl: "http://localhost:5000/post-assets/1742404485946.png",
      likes: ["galgol@gamil.com"],
      comments: [
        {
          author: "galgol@gamil.com",
          comment: "noder",
          _id: "67dafb97ec35fc36b9f9511f",
        },
      ],
      id: "2bc70192-e579-4a83-9455-d91d310a2207",
      createdAt: "2025-03-19T17:14:45.951Z",
      updatedAt: "2025-03-19T17:26:46.657Z",
      __v: 6,
    },
    {
      _id: "67daffd6ec35fc36b9f956f9",
      author: "Gal Yaakov",
      startTime: "2025-03-18T22:00:00.000Z",
      endTime: "2025-03-19T01:00:00.000Z",
      workout: "UpperBody",
      details: "l",
      imageUrl: "http://localhost:5000/post-assets/1742405590620.jpeg",
      likes: [],
      comments: [],
      id: "ef2853c2-6781-4a82-b7d8-98b486c71de0",
      createdAt: "2025-03-19T17:33:10.628Z",
      updatedAt: "2025-03-19T17:33:10.628Z",
      __v: 0,
    },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = (postId: string) => {
    api
      .delete(`${BACKEND_URL}/api/post?postId=${postId}`)
      .then((res) => {
        Swal.fire({
          title: "Delete Success!",
          text: "Post deleted successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          getAllPosts();
        });
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          setError(error.response?.data?.error || "Axios error occurred");
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      });
  };

  const getAllPosts = async () => {
    setLoading(true);
    setTimeout(() => {
      api
        .get(`${BACKEND_URL}/api/post/my`)
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
    return <CircularProgress color="inherit" sx={{ marginTop: "10%" }} />;
  }
  if (error) {
    Swal.fire({
      title: "Error!",
      text: `Something went wrong while adding the post. Error: ${error}`,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: 1200,
        mx: "auto",
        p: 2,
      }}
    >
      {posts.map((post: IPost) => {
        return (
          <div
            id="my-posts"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Post props={post} />
            <div>
              <IconButton
                sx={{ position: "absolute" }}
                onClick={() => handleDelete(post._id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
    </Grid>
  );
};

export default PostsView;
