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

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

export const BACKEND_URL = `http://localhost:${PORT}`

export const initApp = async () => {
    app.use(
        cors({
          origin: process.env.FRONTEND_URL || "http://localhost:3000",
          methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          credentials: true,
        })
      );
      
      app.use(morgan("dev"));
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      
      app.use(
        expressSession({
          secret: process.env.SESSION_SECRET || "your-secret-key",
          resave: false,
          saveUninitialized: true,
          cookie: { secure: process.env.NODE_ENV === "production" },
        })
      );
      
      
      await connectDB();
      
      
      app.use(passport.initialize());
      app.use(passport.session());
      
      

      app.use('/api/user', userRouter);
      app.use('/api/post', postRouter);
      app.use("/api/workout", workoutRouter);
      
      setupSwagger(app);
      
      app.use('/post-assets', express.static('post-assets'))
      
      app.get('/', (req, res) => {
          res.send('API is running...');
      });      


      return app
}


