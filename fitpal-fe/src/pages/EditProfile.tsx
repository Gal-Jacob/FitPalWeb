import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  CardContent,
  TextField,
  Avatar,
  InputAdornment,
  Grid2 as Grid,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface FormState {
  height: string;
  weight: string;
}

const EditProfile = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    height: "",
    weight: "",
  });

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL
      setSelectedImage(imageUrl);
    }
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
    console.log({
      height: formData.height,
      weight: formData.weight,
    });
    alert("Form Submitted!");
  };

  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <CardContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                Edit Profile
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
                  {selectedImage ? (
                    <Avatar
                      src={selectedImage}
                      sx={{ width: 150, height: 150 }}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 150, height: 150, backgroundColor: "white" }}
                    >
                      <Person
                        sx={{ width: 120, height: 120, color: "#4343f054" }}
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
                      Update Image
                    </Button>
                  </label>
                </div>
                <Typography variant="h5">Gal Yaakov</Typography>

                <Grid container spacing={2}>
                  <Grid size={6}>
                    {/* Text Field */}
                    <TextField
                      name="height"
                      label="Height"
                      multiline
                      fullWidth
                      margin="normal"
                      value={formData.height}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="start">cm</InputAdornment>
                          ),
                        },
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={6}>
                    {/* Text Field */}
                    <TextField
                      name="weight"
                      label="Weight"
                      multiline
                      fullWidth
                      margin="normal"
                      value={formData.weight}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="start">kg</InputAdornment>
                          ),
                        },
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

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

export default EditProfile;
