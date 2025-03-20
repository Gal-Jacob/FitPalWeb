import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { WorkoutService } from "../services/workoutService";

class WorkoutController {
  private workoutService: WorkoutService;

  constructor() {
    this.workoutService = new WorkoutService();
  }


  public getUserPosts = async (req: Request| any, res: Response) => {
    try {        
        if (!req.user.email) {
          return res.status(400).json({"message": "email not provided"})
        }
        const email: string = req.user.email; 

        return res.status(200).json(await this.workoutService.getUserWorkout(email))
    } catch (error) {

        return res.status(500).json({ message: 'Server error', error });
    }
};

  async generateWorkoutPlan(req: Request | any, res: Response) {

    console.log(req.params);

    if (!req.params.email) {
      return res.status(400).json({"message": "email not provided"})
    }
    const email: string = req.params.email; 

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "GEMINI_API_KEY is not defined" });
    }

    const ai = new GoogleGenerativeAI(apiKey);

    const workoutPlanResponse = await this.workoutService.generateWorkoutPlan(
      email,
      req.body.data,
      ai
    );

    res.status(200).json(workoutPlanResponse);
  }
}

export default WorkoutController;
