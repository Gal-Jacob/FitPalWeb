import { useState } from "react";
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

// const workoutData = {
//   success: true,
//   plan: {
//     summary:
//       "This 4-day workout plan focuses on building muscle, increasing strength, and improving cardiovascular health. It incorporates strength training and HIIT elements while being mindful of lower back pain.  Each workout is designed to be completed in approximately 45 minutes.",
//     days: [
//       {
//         day: "Day 1",
//         focus: "Upper Body",
//         exercises: [
//           {
//             name: "Incline Dumbbell Bench Press",
//             sets: 3,
//             reps: 10,
//             restPeriod: "60 seconds",
//             notes: "Focus on controlled movements and avoid arching your back.",
//           },
//           {
//             name: "Dumbbell Rows",
//             sets: 3,
//             reps: 10,
//             restPeriod: "60 seconds",
//             notes: "Maintain a flat back and engage your core.",
//           },
//           {
//             name: "Pull-ups (or Assisted Pull-ups)",
//             sets: 3,
//             reps: "As many reps as possible (AMRAP)",
//             restPeriod: "90 seconds",
//             notes:
//               "If unable to perform full pull-ups, use an assisted machine or resistance bands.",
//           },
//           {
//             name: "Overhead Dumbbell Press",
//             sets: 3,
//             reps: 10,
//             restPeriod: "60 seconds",
//             notes: "Maintain a stable core and controlled movement.",
//           },
//         ],
//         warmup: [
//           "Arm circles forward and backward",
//           "Dumbbell shoulder press with light weight (5 reps each side)",
//         ],
//         cooldown: [
//           "Static chest stretch (hold for 30 seconds)",
//           "Triceps stretch (hold for 30 seconds each side)",
//         ],
//       },
//       {
//         day: "Day 2",
//         focus: "Lower Body",
//         exercises: [
//           {
//             name: "Goblet Squats",
//             sets: 3,
//             reps: 12,
//             restPeriod: "60 seconds",
//             notes:
//               "Maintain a straight back and avoid letting your knees cave inwards. Modify to box squats if needed for lower back comfort.",
//           },
//           {
//             name: "Romanian Deadlifts (RDLs)",
//             sets: 3,
//             reps: 10,
//             restPeriod: "60 seconds",
//             notes:
//               "Focus on hinge movement at the hips and maintain a slight bend in the knees.  If lower back pain persists, reduce weight or perform glute bridges instead.",
//           },
//           {
//             name: "Walking Lunges",
//             sets: 3,
//             reps: 10,
//             restPeriod: "60 seconds",
//             notes: "Keep your front knee aligned with your ankle.",
//           },
//           {
//             name: "Calf Raises",
//             sets: 3,
//             reps: 15,
//             restPeriod: "60 seconds",
//             notes:
//               "Use a slightly elevated surface for a greater range of motion.",
//           },
//         ],
//         warmup: [
//           "Bodyweight squats (10 reps)",
//           "Walking lunges (5 reps each leg)",
//         ],
//         cooldown: [
//           "Hamstring stretch (hold for 30 seconds each leg)",
//           "Quadriceps stretch (hold for 30 seconds each leg)",
//         ],
//       },
//       {
//         day: "Day 3",
//         focus: "Cardio and Core",
//         exercises: [
//           {
//             name: "Kettlebell Swings",
//             sets: 3,
//             reps: 15,
//             restPeriod: "60 seconds",
//             notes:
//               "Focus on the hip hinge movement and maintain a neutral spine.",
//           },
//           {
//             name: "Burpees",
//             sets: 3,
//             reps: 10,
//             restPeriod: "60 seconds",
//             notes: "Modify by stepping out instead of jumping.",
//           },
//           {
//             name: "Plank",
//             sets: 3,
//             reps: "Hold for 30-60 seconds",
//             restPeriod: "60 seconds",
//             notes: "Maintain a straight line from head to heels.",
//           },
//           {
//             name: "Russian Twists",
//             sets: 3,
//             reps: 15,
//             restPeriod: "60 seconds",
//             notes: "Use a light weight or no weight if needed.",
//           },
//         ],
//         warmup: ["Jumping jacks (30 seconds)", "High knees (30 seconds)"],
//         cooldown: [
//           "Lying knee hug (hold for 30 seconds each leg)",
//           "Cobra pose (hold for 30 seconds)",
//         ],
//       },
//       {
//         day: "Day 4",
//         focus: "Full Body Strength",
//         exercises: [
//           {
//             name: "Dumbbell Bench Press",
//             sets: 3,
//             reps: 8,
//             restPeriod: "60 seconds",
//             notes: "Maintain a controlled movement throughout.",
//           },
//           {
//             name: "Deadlifts (with dumbbells or kettlebells)",
//             sets: 3,
//             reps: 8,
//             restPeriod: "75 seconds",
//             notes:
//               "If experiencing lower back pain, reduce the weight and focus on proper form. Consider a trap bar deadlift variation if accessible.",
//           },
//           {
//             name: "Overhead Press",
//             sets: 3,
//             reps: 8,
//             restPeriod: "60 seconds",
//             notes: "Engage your core for stability.",
//           },
//           {
//             name: "Bent-Over Rows",
//             sets: 3,
//             reps: 8,
//             restPeriod: "60 seconds",
//             notes: "Maintain a flat back.",
//           },
//         ],
//         warmup: [
//           "Dynamic stretches (arm circles, leg swings)",
//           "Light dumbbell squats (5 reps)",
//         ],
//         cooldown: [
//           "Child's pose (hold for 30 seconds)",
//           "Cat-cow stretch (10 reps)",
//         ],
//       },
//     ],
//     notes: [
//       "Be sure to take rest days between workouts to allow for muscle recovery. Listen to your body and adjust the intensity or number of reps as needed. Consistency is key, so find a schedule that you can maintain. Rest at least 24 hours between strength training sessions focusing on the same muscle group.",
//       "Include 1-2 complete rest days per week where you focus on light activity like walking or stretching.",
//     ],
//     nutritionTips: [
//       "Consume a balanced diet with sufficient protein to support muscle growth. Aim for 1 gram of protein per pound of body weight.",
//       "Prioritize complex carbohydrates over simple carbohydrates for sustained energy levels. Include plenty of fruits and vegetables.",
//       "Stay hydrated by drinking plenty of water throughout the day, especially before, during, and after workouts.",
//       "Consider using a protein supplement to help you meet your daily protein goals if needed.",
//     ],
//   },
// };

const _workoutData = {
  success: true,
  plan: {
    summary:
      "This 3-day workout plan focuses on building muscle, increasing strength, and improving cardiovascular health for an intermediate fitness level. It incorporates strength training and HIIT elements while considering the client's lower back pain. The plan includes modifications and emphasizes proper form to prevent injury.",
    days: [
      {
        day: "Day 1",
        focus: "Upper Body",
        exercises: [
          {
            name: "Incline Dumbbell Press",
            sets: 3,
            reps: "8-12",
            restPeriod: "60 seconds",
            notes:
              "Focus on controlled movements and avoid arching your back. Use a lighter weight if needed to maintain good form.",
          },
          {
            name: "Dumbbell Rows",
            sets: 3,
            reps: "8-12",
            restPeriod: "60 seconds",
            notes:
              "Maintain a straight back and engage your core. Use a bench for support if needed to protect your lower back.",
          },
          {
            name: "Pull-ups (Assisted if needed)",
            sets: 3,
            reps: "As many as possible (AMRAP)",
            restPeriod: "60 seconds",
            notes:
              "Use an assisted pull-up machine or resistance bands if needed.",
          },
          {
            name: "Overhead Press (Dumbbells)",
            sets: 3,
            reps: "8-12",
            restPeriod: "60 seconds",
            notes: "Avoid locking out your elbows at the top of the movement.",
          },
        ],
        warmup: [
          "Arm circles forward and backward",
          "Shoulder rotations",
          "Push-ups (on knees if needed)",
        ],
        cooldown: [
          "Static stretches for chest, shoulders, and back",
          "Triceps stretch",
        ],
      },
      {
        day: "Day 2",
        focus: "Lower Body",
        exercises: [
          {
            name: "Goblet Squats",
            sets: 3,
            reps: "10-15",
            restPeriod: "60 seconds",
            notes:
              "Maintain a neutral spine and avoid letting your knees cave inwards.",
          },
          {
            name: "Romanian Deadlifts (RDLs)",
            sets: 3,
            reps: "10-15",
            restPeriod: "60 seconds",
            notes:
              "Focus on hinging at the hips and maintain a slight bend in your knees. Avoid rounding your back. Reduce weight if necessary to protect the lower back.",
          },
          {
            name: "Glute Bridges",
            sets: 3,
            reps: "15-20",
            restPeriod: "60 seconds",
            notes: "Squeeze your glutes at the top of the movement.",
          },
          {
            name: "Calf Raises",
            sets: 3,
            reps: "15-20",
            restPeriod: "60 seconds",
            notes: "Use a slightly elevated surface if desired.",
          },
        ],
        warmup: [
          "Bodyweight squats",
          "Lunges (forward and reverse)",
          "Glute bridges",
        ],
        cooldown: ["Hamstring stretch", "Quadriceps stretch", "Calf stretch"],
      },
      {
        day: "Day 3",
        focus: "Full Body & HIIT",
        exercises: [
          {
            name: "Kettlebell Swings",
            sets: 3,
            reps: "10-15",
            restPeriod: "60 seconds",
            notes:
              "Power the swing with your hips and glutes, not your arms. Be mindful of lower back and stop if pain arises.",
          },
          {
            name: "Dumbbell Thrusters",
            sets: 3,
            reps: "8-12",
            restPeriod: "60 seconds",
            notes: "Combine a squat with an overhead press.",
          },
          {
            name: "Burpees (Modified if needed)",
            sets: 3,
            reps: "8-12",
            restPeriod: "60 seconds",
            notes:
              "Perform the burpee without the jump if needed to protect your lower back.",
          },
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: "30 seconds",
            restPeriod: "60 seconds",
            notes: "Maintain a plank position throughout the exercise.",
          },
        ],
        warmup: ["Jumping jacks", "High knees", "Butt kicks"],
        cooldown: ["Full body stretching focusing on major muscle groups"],
      },
    ],
    notes: [
      "Suggested schedule: Monday - Day 1, Wednesday - Day 2, Friday - Day 3 (or similar with rest days in between).",
      "Listen to your body and rest when needed. Adjust sets, reps, and rest periods as needed.",
      "Progress gradually by increasing weight, reps, or sets.",
    ],
    nutritionTips: [
      "Consume a balanced diet rich in protein to support muscle growth. Aim for 1 gram of protein per pound of body weight.",
      "Prioritize complex carbohydrates for sustained energy levels.",
      "Include healthy fats from sources like avocados, nuts, and olive oil.",
      "Stay hydrated by drinking plenty of water throughout the day.",
    ],
  },
};

const extractScheduleFromWorkoutData = (workoutData: any): ISchedule[] => {
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

  if (!scheduleSuggestion) return fullWeekSchedule;

  const schedulePart =
    scheduleSuggestion.split("Suggested schedule:")[1]?.trim() ||
    scheduleSuggestion;

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
  const [workoutData, setWorkoutData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (data: WorkoutPlanRequest) => {
    console.log("Generated Workout Plan:", data);
    // You can send this data to an API or process it as needed
  };

  const handleGenerateWorkout = async () => {
    // Call the backend API to generate a new workout plan
    setLoading(true);
    handleOpen();

    const user = localStorage.getItem("myEmail");
    const response = await (
      await api.get(`/api/user/findUserByEmail?email=${user}`)
    ).data;

    console.log(response);

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
      await api.post(`${BACKEND_URL}/api/workout/generate/${user}`)
    ).data;
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
                  onClick={handleGenerateWorkout}
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
                  {loading ? <CircularProgress size={24} /> : "New Workout"}
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
