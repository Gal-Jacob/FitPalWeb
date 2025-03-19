import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Info } from "@mui/icons-material";

import { IWorkoutPlanProps } from "../types";

const WorkoutPlan: React.FC<IWorkoutPlanProps> = ({ days }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDay(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={selectedDay}
        onChange={handleChange}
        centered
        variant="fullWidth"
      >
        {days.map((day, index) => (
          <Tab
            key={index}
            label={day.focus}
            sx={{
              "&:focus": {
                outline: "none",
              },
            }}
          />
        ))}
      </Tabs>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="workout table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Exercise</TableCell>
              <TableCell align="center">Sets</TableCell>
              <TableCell align="center">Reps</TableCell>
              <TableCell align="center">Rest</TableCell>
              <TableCell align="center">Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {days[selectedDay].exercises.map((exercise) => (
              <TableRow
                key={exercise.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{exercise.name}</TableCell>
                <TableCell align="center">{exercise.sets}</TableCell>
                <TableCell align="center">{exercise.reps}</TableCell>
                <TableCell align="center">{exercise.restPeriod}</TableCell>
                <TableCell align="center">
                  <Tooltip title={exercise.notes}>
                    <IconButton size="small">
                      <Info fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WorkoutPlan;
