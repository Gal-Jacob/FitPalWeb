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
import { fileURLToPath } from "url";
import './utils/multerFilesUpload'
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

export const BACKEND_URL = `${process.env.BACKEND_URL}:${PORT}`

export const initApp = async () => {
    app.use(
        cors({
          origin: process.env.FRONTEND_URL || "http://localhost:3000",
          methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          credentials: true,
        })
      );

      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Credentials", "true");
        next();
      });
      
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
      
      app.get('/api/check', (req, res) => {
          res.send('API is running...');
      });      


      // const __filename = fileURLToPath(import.meta.url);
      // const __dirname = path.dirname(__filename);
      // //Expost FE dist folder
      // app.use(express.static(path.join(__dirname, "fe-dist"))); // For React
      // // For any route not handled by the API, serve index.html
      // app.get("*", (req, res) => {
      //   res.sendFile(path.join(__dirname, "..", "my-vite-app", "dist", "index.html"));
      // });

      return app
}


