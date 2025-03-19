import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  WorkoutPlanRequest,
  WorkoutPlanResponse,
  WorkoutPlan,
} from "../utils/types";
import { parseWorkoutPlanFromText } from "../utils/workoutParser";

export class WorkoutService {
  /**
   * Generate a workout plan based on user preferences
   * @param workoutData User workout preferences
   * @returns WorkoutPlanResponse with either a plan or error
   */
  async generateWorkoutPlan(
    workoutData: WorkoutPlanRequest,
    ai: GoogleGenerativeAI
  ): Promise<WorkoutPlanResponse> {
    try {
      if (
        !workoutData.fitnessLevel ||
        !workoutData.goals ||
        workoutData.goals.length === 0
      ) {
        return {
          success: false,
          error: "Missing required fields",
        };
      }

      const prompt = this.generatePrompt(workoutData);

      const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const workoutPlanText = response.text();

      try {
        const plan = parseWorkoutPlanFromText(
          workoutPlanText,
          workoutData.availability
        );

        return {
          success: true,
          plan,
        };
      } catch (parseError) {
        console.error("Error parsing workout plan:", parseError);
        return {
          success: false,
          error: "Failed to parse workout plan",
        };
      }
    } catch (error) {
      console.error("Error generating workout plan:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Helper function to create a structured prompt for the AI
   */
  private generatePrompt(workoutData: WorkoutPlanRequest): string {
    const {
      fitnessLevel,
      goals,
      availability,
      duration,
      intensity,
      equipment,
      medicalConditions,
      preferences,
    } = workoutData;

    return `You are a professional fitness trainer creating a customized workout plan.
    
Create a detailed weekly workout schedule based on the following information:

Client Profile:
- Fitness Level: ${fitnessLevel}
- Goals: ${goals.join(", ")}
- Weekly Availability: ${availability} days per week
- Workout Duration: ${duration} minutes per session
- Workout Intensity: ${intensity}
- Available Equipment: ${
      equipment && equipment.length > 0 ? equipment.join(", ") : "None"
    }
- Medical Considerations: ${
      medicalConditions && medicalConditions.length > 0
        ? medicalConditions.join(", ")
        : "None"
    }
- Exercise Preferences: ${
      preferences && preferences.length > 0 ? preferences.join(", ") : "None"
    }

Please format your response as follows for each day:

Day 1: [Focus Area]
- Exercise 1: [sets] x [reps], [rest period]
- Exercise 2: [sets] x [reps], [rest period]
...

Day 2: [Focus Area]
...

Include exactly ${availability} workout days in your plan.
Make sure all exercises are suitable given the fitness level and medical considerations.`;
  }
}
