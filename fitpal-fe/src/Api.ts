import axios from "axios";
import { BACKEND_URL, TOKEN_LS } from "./config";

// Create an Axios instance
const api = axios.create({
  baseURL: BACKEND_URL, // Change this to your API URL
});

// Request Interceptor: Adds Token from Local Storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_LS); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Unauthorized Access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("TOKEN_LS"); // Remove invalid token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
