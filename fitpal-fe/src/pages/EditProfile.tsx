import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import { Edit, Person, Save } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../Api";
import { BACKEND_URL } from "../config";

interface FormState {
  height: string;
  weight: string;
  firstName: string;
  lastName: string;
  photo: string | null;
}

const EditProfile = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    height: "",
    weight: "",
    firstName: "",
    lastName: "",
    photo: null,
  });
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [image, setImage] = useState<string | null | File>(null);
  const [imagePreview, setImagePreview] = useState<string | null | File>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`${BACKEND_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          height: response.data.height || "",
          weight: response.data.weight || "",
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          photo: response.data.photo || null,
        });
        setSelectedImage(response.data.photo || null); // Set the current photo
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files;
  
    if (fileInput && fileInput[0]) {
      const file = fileInput[0];
      console.log("Selected file:", file); // Debugging
      setImage(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("FileReader result:", reader.result); // Debugging
        setImagePreview(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown } | HTMLInputElement>
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      await api.patch(
        `${BACKEND_URL}/api/user/profile`,
        {
          weight: formData.weight,
          height: formData.height,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      navigate("/profile")
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSaveOrEdit = async () => {
    if (isEditingName) {
      
      try {
        const token = localStorage.getItem("token"); 
        await api.patch(
          `${BACKEND_URL}/api/user/profile`,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            image: image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    toggleEditName(); 
  };

  const toggleEditName = () => {
    setIsEditingName((prev) => !prev);
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
                      src={imagePreview}
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

                  <input
                    accept="image/*"
                    type="file"
                    id="image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />

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

                <div style={{ 
                  display: "flex",
                  justifyContent: 'center', 
                  alignItems: 'center',
                  gap: "10px" 
                  }}>
                  {isEditingName ? (
                    <>
                      <TextField
                        name="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        name="lastName"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                    </>
                  ) : (
                    <Typography variant="h5">
                      {formData.firstName} {formData.lastName}
                    </Typography>
                  )}
                  <IconButton
                    color="primary"
                    onClick={handleSaveOrEdit}
                    disableRipple
                    disableFocusRipple
                  >
                    {isEditingName ? <Save /> : <Edit />}
                  </IconButton>
                </div>

                <Grid container spacing={2}>
                  <Grid size={6}>
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