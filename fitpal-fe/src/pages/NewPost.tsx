import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  CardContent,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
  Avatar,
} from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Swal from "sweetalert2";
import { error } from "console";
import api from "../Api";

interface FormState {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  workout: string;
  details: string;
}

const NewPost = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState<string | null | File>(null);
  const [imagePreview, setImagePreview] = useState<string | null | File>(null);
  const [formData, setFormData] = useState<FormState>({
    startTime: null,
    endTime: null,
    workout: "",
    details: "",
  });

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files;

    if (fileInput && fileInput[0]) {
      const file = fileInput[0]; // Get the first file selected
      setImage(file); // Set base64 image preview

      // Optionally, preview the image (for visual feedback)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file); // Read the file as data URL (for preview)
    }
  };

  // Handle time selection
  const handleTimeChange = (
    key: "startTime" | "endTime",
    value: Dayjs | null
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle select and text field changes
  const handleChange = (
    event: React.ChangeEvent<{ value: unknown } | HTMLInputElement>
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    console.log({ name, value });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.startTime || !formData.endTime || !image) {
      return;
    }

    const form = new FormData();
    form.append("author", "Gal Yaakov"); // TODO: Replace with logged-in user's name
    form.append("startTime", formData.startTime.format());
    form.append("endTime", formData.endTime.format());
    form.append("workout", formData.workout);
    form.append("details", formData.details);
    form.append("image", image);

    api
      .post("http://localhost:5000/api/post/add", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Post added successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate(-1);
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: `Something went wrong while adding the post. Error: ${error}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <CardContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                New post
              </Typography>
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    padding: "30px",
                    margin: "20px 0px",
                    background: "#4343f054",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {image ? (
                    <Avatar
                      src={imagePreview}
                      sx={{ width: 150, height: 150 }}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 150, height: 150, backgroundColor: "white" }}
                    >
                      <AddPhotoAlternate
                        sx={{ width: 80, height: 80, color: "#7f7d7d" }}
                      />
                    </Avatar>
                  )}

                  {/* Hidden file input */}
                  <input
                    accept="image/*"
                    type="file"
                    id="image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />

                  {/* Upload Button */}
                  <label htmlFor="image-upload">
                    <Button
                      sx={{ marginTop: 1 }}
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Upload Image
                    </Button>
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    padding: "0px",
                  }}
                >
                  {/* Start Time Picker */}
                  <TimePicker
                    label="Start Time"
                    value={formData.startTime}
                    onChange={(value: dayjs.Dayjs | null) =>
                      handleTimeChange("startTime", value)
                    }
                    renderInput={(
                      params: JSX.IntrinsicAttributes & {
                        variant?: TextFieldVariants | undefined;
                      } & Omit<
                          | FilledTextFieldProps
                          | OutlinedTextFieldProps
                          | StandardTextFieldProps,
                          "variant"
                        >
                    ) => <TextField {...params} fullWidth margin="normal" />}
                  />
                  {/* End Time Picker */}
                  <TimePicker
                    label="End Time"
                    value={formData.endTime}
                    onChange={(value: dayjs.Dayjs | null) =>
                      handleTimeChange("endTime", value)
                    }
                    renderInput={(
                      params: JSX.IntrinsicAttributes & {
                        variant?: TextFieldVariants | undefined;
                      } & Omit<
                          | FilledTextFieldProps
                          | OutlinedTextFieldProps
                          | StandardTextFieldProps,
                          "variant"
                        >
                    ) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </div>

                {/* Select Input */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Workout</InputLabel>
                  <Select
                    name="workout"
                    value={formData.workout}
                    onChange={handleChange}
                  >
                    <MenuItem value="FullBody">full body</MenuItem>
                    <MenuItem value="UpperBody">upper body</MenuItem>
                    <MenuItem value="LowerBody">lower body</MenuItem>
                  </Select>
                </FormControl>

                {/* Text Field */}
                <TextField
                  name="details"
                  label="Details"
                  multiline
                  rows={3}
                  fullWidth
                  margin="normal"
                  value={formData.details}
                  onChange={handleChange}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
                <Button
                  onClick={() => navigate(-1)}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Cancel
                </Button>
              </form>
            </Container>
          </LocalizationProvider>
        </CardContent>
      </Container>
    </div>
  );
};

export default NewPost;
