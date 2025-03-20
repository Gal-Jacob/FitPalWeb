import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from "@mui/material";

import { ISchedule, WorkoutPlanRequest } from "../types";
import WorkoutPlan from "./WorkoutPlan";
import ScheduleCard from "./ScheduleCard";
import api from "../Api";
import { BACKEND_URL } from "../config";
import Swal from "sweetalert2";
import WorkoutPlanModal from "./WorkoutPlanModal";

const extractScheduleFromWorkoutData = (workoutData: any): ISchedule[] => {
  console.log({ aa: workoutData });

  const scheduleSuggestion = workoutData.plan.notes.find((note: string) =>
    note.includes("Suggested schedule")
  );

  const fullWeekSchedule: ISchedule[] = [
    { day: "Sunday", workout: "Rest" },
    { day: "Monday", workout: "Rest" },
    { day: "Tuesday", workout: "Rest" },
    { day: "Wednesday", workout: "Rest" },
    { day: "Thursday", workout: "Rest" },
    { day: "Friday", workout: "Rest" },
    { day: "Saturday", workout: "Rest" },
  ];

  console.log({ scheduleSuggestion });

  if (!scheduleSuggestion) return fullWeekSchedule;

  const schedulePart =
    scheduleSuggestion.split("Suggested schedule:")[1]?.trim() ||
    scheduleSuggestion;

  console.log({ schedulePart });

  const dayPattern =
    /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*-\s*(Day\s*\d+)/gi;
  let match;

  const dayToFocusMap = new Map();
  workoutData.plan.days.forEach((day: any) => {
    const dayNumber = day.day;
    const focus = day.focus;
    dayToFocusMap.set(dayNumber, focus);
  });

  while ((match = dayPattern.exec(schedulePart)) !== null) {
    const weekday = match[1].trim();
    const workoutDay = match[2].trim();

    const dayIndex = fullWeekSchedule.findIndex(
      (item) => item.day.toLowerCase() === weekday.toLowerCase()
    );

    if (dayIndex !== -1) {
      fullWeekSchedule[dayIndex].workout =
        dayToFocusMap.get(workoutDay) || workoutDay;
    }
  }

  return fullWeekSchedule;
};

const WorkoutView: React.FC = () => {
  const [workoutData, setWorkoutData] = useState<string | any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const workoutPlan = {
        plan: (await api.get(`${BACKEND_URL}/api/workout/my`)).data,
      };

      console.log({ workoutPlan });

      setWorkoutData(workoutPlan);
    };

    fetchWorkoutData();
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: WorkoutPlanRequest) => {
    // Call the backend API to generate a new workout plan
    setLoading(true);
    handleOpen();

    const user = localStorage.getItem("myEmail");
    const response = await (
      await api.get(`/api/user/findUserByEmail?email=${user}`)
    ).data;

    if (!response) {
      Swal.fire({
        icon: "error",
        title: "User Not Found",
        text: "The user could not be found. Please try another username.",
      });
      return;
    }

    const userData = response.user;
    const workoutPlan = (
      await api.post(`${BACKEND_URL}/api/workout/generate/${user}`, { data })
    ).data;

    console.log({ workoutPlan });

    setWorkoutData(workoutPlan);
    setLoading(false);
  };

  if (!workoutData && !loading) {
    return (
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          mx: "auto",
          p: 2,
          marginTop: 2,
        }}
      >
        <Grid size={12}>
          <Card className="bright-background">
            <CardContent>
              <Typography variant="body1" align="center" sx={{ py: 4 }}>
                No workout plan is available. Generate a new workout plan to get
                started.
              </Typography>
              <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  disabled={loading}
                >
                  Generate Workout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          mx: "auto",
          p: 2,
          marginTop: 2,
        }}
      >
        <Grid size={8}>
          <Card className="bright-background">
            <CardHeader
              title={
                <Typography variant="h5" gutterBottom>
                  Weekly Workout Plan
                </Typography>
              }
              action={
                <Button
                  variant="contained"
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  onClick={() => handleOpen()}
                >
                  {loading ? (
                    <CircularProgress size={24} color="white" />
                  ) : (
                    "New Workout"
                  )}
                </Button>
              }
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
              }}
            />
            <CardContent id="workout-card">
              {workoutData && workoutData.plan && workoutData.plan.days ? (
                <Grid size={12} id="workout-details">
                  <WorkoutPlan days={workoutData.plan.days} />
                </Grid>
              ) : (
                <Typography variant="body1" align="center" sx={{ py: 2 }}>
                  Workout plan details are not available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Grid container spacing={2}>
            <Grid size={12}>
              {workoutData ? (
                <ScheduleCard
                  schedule={extractScheduleFromWorkoutData(workoutData)}
                />
              ) : (
                <Card className="bright-background">
                  <CardContent>
                    <Typography variant="body1" align="center">
                      Schedule is not available.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <WorkoutPlanModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default WorkoutView;
