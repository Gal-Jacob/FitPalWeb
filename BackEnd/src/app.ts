import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import expressSession from "express-session";

import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import workoutRouter from "./routes/workoutRouter";
import connectDB from "./db/db";
import passport from "./utils/googlePassport";
import setupSwagger from "./utils/swagger";

import './utils/multerFilesUpload'
import initApp from "./server";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
export const BACKEND_URL = `http://localhost:${PORT}`

initApp().listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
