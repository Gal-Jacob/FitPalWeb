import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { WorkoutPlanRequest } from "../types";

const goalsOptions = ["Weight Loss", "Muscle Gain", "Endurance", "Flexibility"];
const intensityOptions = ["Low", "Medium", "High"];
const equipmentOptions = [
  "Dumbbells",
  "Resistance Bands",
  "Kettlebells",
  "Treadmill",
];

const WorkoutPlanModal = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: WorkoutPlanRequest) => void;
}) => {
  const [formData, setFormData] = useState<WorkoutPlanRequest>({
    fitnessLevel: "beginner",
    goals: [],
    availability: 0,
    duration: 30,
    intensity: "Medium",
  });

  const handleChange = (field: keyof WorkoutPlanRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (
    field: keyof WorkoutPlanRequest,
    value: string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 600,
          p: 3,
          bgcolor: "white",
          m: "auto",
          mt: 5,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Create Workout Plan</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Fitness Level</InputLabel>
          <Select
            value={formData.fitnessLevel}
            onChange={(e) => handleChange("fitnessLevel", e.target.value)}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Goals</InputLabel>
          <Select
            multiple
            value={formData.goals}
            onChange={(e) =>
              handleMultiSelectChange("goals", e.target.value as string[])
            }
            renderValue={(selected) => selected.join(", ")}
          >
            {goalsOptions.map((goal) => (
              <MenuItem key={goal} value={goal}>
                <Checkbox checked={formData.goals.includes(goal)} />
                <ListItemText primary={goal} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Availability (hrs/week)"
          type="number"
          value={formData.availability}
          onChange={(e) => handleChange("availability", Number(e.target.value))}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Duration (minutes)"
          type="number"
          value={formData.duration}
          onChange={(e) => handleChange("duration", Number(e.target.value))}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Intensity</InputLabel>
          <Select
            value={formData.intensity}
            onChange={(e) => handleChange("intensity", e.target.value)}
          >
            {intensityOptions.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Equipment</InputLabel>
          <Select
            multiple
            value={formData.equipment || []}
            onChange={(e) =>
              handleMultiSelectChange("equipment", e.target.value as string[])
            }
            renderValue={(selected) => selected.join(", ")}
          >
            {equipmentOptions.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox
                  checked={formData.equipment?.includes(item) || false}
                />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WorkoutPlanModal;
