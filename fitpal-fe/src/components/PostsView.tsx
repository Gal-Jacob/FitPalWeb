import { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { InsertPhoto } from "@mui/icons-material";
import { IPost } from "../types";

const PostsView: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([
    {
      postId: "1",
      owner: "Gal Yaakov",
      photo: "",
      title: "Workout finished",
      time: "1:15:00",
      workout: "Full Body",
      details: "Today was a good Workout",
    },
    {
      postId: "2",
      owner: "Yoav David",
      photo: "",
      title: "Workout finished",
      time: "1:15:00",
      workout: "Upper Body",
      details: "Today was a good Workout",
    },
    {
      postId: "3",
      owner: "Ido Sharon",
      photo: "",
      title: "Workout finished",
      time: "4:15:00",
      workout: "Only ass",
      details: "Today was a good Workout",
    },
  ]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: 1200,
        mx: "auto",
        p: 2,
      }}
    >
      {posts.map((post: IPost) => {
        return (
          <Grid size={4}>
            <Card>
              <CardContent>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    backgroundColor: "#4343f054",
                    margin: "auto",
                  }}
                >
                  {post.photo}
                  <InsertPhoto sx={{ width: 80, height: 80, color: "white" }} />
                </Avatar>
                <Grid container>
                  <Grid size={12}>
                    <Typography variant="body1" gutterBottom>
                      <b>{post.title}</b>
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body2" gutterBottom>
                      <b>{post.details}</b>
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="body2" gutterBottom>
                      <b>{post.workout}</b>
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="body2" gutterBottom>
                      <b>{post.time}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostsView;
