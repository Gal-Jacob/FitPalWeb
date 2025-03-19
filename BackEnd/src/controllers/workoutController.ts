import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { WorkoutService } from "../services/workoutService";

class WorkoutController {
  private workoutService: WorkoutService;

  constructor() {
    this.workoutService = new WorkoutService();
  }

  async generateWorkoutPlan(req: Request, res: Response) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "GEMINI_API_KEY is not defined" });
    }

    const ai = new GoogleGenerativeAI(apiKey);

    const workoutPlanResponse = await this.workoutService.generateWorkoutPlan(
      req.body,
      ai
    );

    res.status(200).json(workoutPlanResponse);
  }
}

export default WorkoutController;
