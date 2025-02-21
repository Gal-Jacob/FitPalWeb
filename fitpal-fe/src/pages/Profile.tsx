import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { IProfile, IExercise, IGuideline, ISchedule } from "../types";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EditIcon from "@mui/icons-material/Edit";
import NewPostButton from "../components/newPostButton/NewPostButton";

interface IWorkoutPlane {
  exercises: IExercise[];
}

const WorkoutPlane: React.FC<IWorkoutPlane> = ({ exercises }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Exercise</TableCell>
            <TableCell align="left">Sets</TableCell>
            <TableCell align="left">Reps</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise) => (
            <TableRow
              key={exercise.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{exercise.name}</TableCell>
              <TableCell align="left">{exercise.sets}</TableCell>
              <TableCell align="left">{exercise.reps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<IProfile>({
    name: "Gal Yaakov",
    email: "GalYaakov100@gmail.com",
    gender: "male",
    height: "179cm",
    whight: "100kg",
    photo: "",
  });

  const [workout, setWorkout] = useState<string>("");
  const exercises: IExercise[] = [
    { name: "Pull-ups", sets: 4, reps: "8-12" },
    { name: "Barbell Bench Press", sets: 4, reps: "6-8" },
    { name: "Bent-over Rows", sets: 4, reps: "8-12" },
    { name: "Overhead Shoulder Press", sets: 3, reps: "8-10" },
    { name: "Bicep Curls", sets: 3, reps: "10-12" },
    { name: "Triceps Dips", sets: 3, reps: "10-12" },
    { name: "Face Pulls", sets: 3, reps: "12-15" },
  ];
  const guidelines: IGuideline[] = [
    {
      name: "Rest_Time",
      details: "60-90 sec for hypertrophy, 2-3 min for strength",
    },
    {
      name: "Progressive_Overload",
      details: "Increase weights or reps each week",
    },
    {
      name: "Optional_Cardio",
      details: "20-30 min on rest days (jogging, cycling, HIIT)",
    },
  ];
  const schedule: ISchedule[] = [
    { day: "Day_1", workout: "Workout A" },
    { day: "Day_2", workout: "Workout B" },
    { day: "Day_3", workout: "Rest or Active Recovery" },
    { day: "Day_4", workout: "Workout A" },
    { day: "Day_5", workout: "Workout B" },
    { day: "Day_6", workout: "Optional Cardio/Mobility" },
    { day: "Day_7", workout: "Rest" },
  ];

  const handleChangeWorkout = (
    event: React.ChangeEvent<{ value: unknown } | HTMLInputElement>
  ) => {
    const { value } = event.target as HTMLInputElement;
    setWorkout(value);
  };

  return (
    <div>
      <Container
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "20px",
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
            <InsertPhotoIcon sx={{ width: 80, height: 80, color: "white" }} />
          )}
        </Avatar>
        <Typography variant="h5">{userProfile.name}</Typography>
        <IconButton color="primary" aria-label="like">
          <EditIcon />
        </IconButton>
      </Container>
      <Grid
        container
        spacing={2}
        sx={{
          width: 1200,
          mx: "auto",
          p: 2,
        }}
      >
        <Grid size={8}>
          <Card className="bright-background">
            <CardContent id="workout-card-header">
              <Grid container spacing={2}>
                <Grid size={3} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    Workout
                  </Typography>
                </Grid>
                <Grid size={3} sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Workout</InputLabel>
                    <Select
                      name="workout"
                      value={workout}
                      onChange={handleChangeWorkout}
                    >
                      <MenuItem value="FullBody">full body</MenuItem>
                      <MenuItem value="UpperBody">upper body</MenuItem>
                      <MenuItem value="LowerBody">lower body</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  size={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button variant="contained">New Workout</Button>
                </Grid>
                <Grid size={12} id="workout-details">
                  <WorkoutPlane exercises={exercises} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Card className="bright-background">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Guidelines
                  </Typography>
                  {guidelines.map((guideline: IGuideline) => {
                    return (
                      <Container sx={{ display: "flex", textAlign: "left" }}>
                        <Typography variant="body1" gutterBottom>
                          <b>{guideline.name}</b>-{guideline.details}
                        </Typography>
                      </Container>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card className="bright-background">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Schedule
                  </Typography>
                  {schedule.map((s: ISchedule) => {
                    return (
                      <Container sx={{ display: "flex", textAlign: "left" }}>
                        <Typography variant="body1" gutterBottom>
                          <b>{s.day}</b>-{s.workout}
                        </Typography>
                      </Container>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <NewPostButton />
    </div>
  );
};

export default Profile;
