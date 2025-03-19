import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import { FitnessCenter, Restore } from "@mui/icons-material";
import { IScheduleCardProps } from "../types";

const ScheduleCard: React.FC<IScheduleCardProps> = ({ schedule }) => {
  const isWorkoutDay = (workout: string): boolean => {
    return (
      workout.toLowerCase() !== "rest" &&
      !workout.toLowerCase().includes("rest")
    );
  };

  const getIcon = (workout: string) => {
    return isWorkoutDay(workout) ? (
      <FitnessCenter color="primary" />
    ) : (
      <Restore color="secondary" />
    );
  };

  return (
    <Card elevation={2}>
      <CardHeader
        title={<Typography variant="h5">Weekly Schedule</Typography>}
      />
      <CardContent>
        {schedule.length === 0 && (
          <Typography variant="h4">
            No weekly schedule suggestion available
          </Typography>
        )}
        <Grid container spacing={2}>
          {schedule.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={1}
                sx={{
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: isWorkoutDay(item.workout)
                    ? "rgba(25, 118, 210, 0.05)"
                    : "transparent",
                  border: "1px solid",
                  borderColor: isWorkoutDay(item.workout)
                    ? "primary.light"
                    : "divider",
                  minHeight: "90px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Box sx={{ mr: 1.5 }}>{getIcon(item.workout)}</Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "1.1rem" }}
                  >
                    {item.day}
                  </Typography>
                </Box>

                <Chip
                  label={item.workout}
                  size="medium"
                  color={isWorkoutDay(item.workout) ? "primary" : "default"}
                  variant={isWorkoutDay(item.workout) ? "filled" : "outlined"}
                  sx={{
                    alignSelf: "flex-start",
                    fontSize: "0.8rem",
                    py: 0.5,
                    height: "auto",
                    "& .MuiChip-label": {
                      px: 1.5,
                      whiteSpace: "normal",
                      display: "block",
                    },
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
