import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  WorkoutPlan,
  WorkoutPlanRequest,
  WorkoutPlanResponse,
} from "../utils/types";
import { parseWorkoutPlanFromJson } from "../utils/workoutParser";
import { WorkoutPlanMongoModel } from "../db/models/workoutModel";

export class WorkoutService {

  async getUserWorkout(email: string) {
    return await WorkoutPlanMongoModel.findOne({email: email}).select("-__v -_id").exec();
  }

  /**
   * Generate a workout plan based on user preferences
   * @param workoutData User workout preferences
   * @returns WorkoutPlanResponse with either a plan or error
   */
  async generateWorkoutPlan(
    email: string,
    workoutData: WorkoutPlanRequest,
    ai: GoogleGenerativeAI
  ): Promise<WorkoutPlanResponse> {
    console.log({workoutData});
    
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
      const workoutPlanText = (await result.response).text();

      try {
        const plan: WorkoutPlan = parseWorkoutPlanFromJson(workoutPlanText);
        plan.email = email
        await WorkoutPlanMongoModel.deleteMany({ email: email }).exec();
        const workout = new WorkoutPlanMongoModel(plan) //save workout to mongo
        workout.save()

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
   * @param workoutData The complete workout plan request data
   * @returns A formatted prompt string for the AI
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

Your response MUST be formatted according to this exact JSON schema:

{
  "summary": "Brief overview of the workout plan",
  "days": [
    {
      "day": "Day 1",
      "focus": "Target muscle groups only (e.g., 'Upper Body', 'Lower Body')",
      "warmup": [
        "Warm-up exercise 1",
        "Warm-up exercise 2"
      ],
      "exercises": [
        {
          "name": "Exercise name",
          "sets": 3,
          "reps": 12,
          "restPeriod": "60 seconds",
          "notes": "Optional notes about form or modifications"
        }
      ],
      "cooldown": [
        "Cool-down exercise 1",
        "Cool-down exercise 2"
      ]
    }
  ],
  "notes": [
    "Additional note 1",
    "Additional note 2"
  ],
  "nutritionTips": [
    "Nutrition tip 1",
    "Nutrition tip 2"
  ]
}

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

IMPORTANT: 
1. Create exactly ${availability} workout days in the "days" array
2. The "focus" field must ONLY contain the target muscle groups
3. All field values must be valid JSON:
   - String values must be in quotes (e.g., "Upper Body")
   - Number values should NOT have quotes (e.g., 3 for sets)
   - For ranges like "8-12 reps", use a string value with quotes (e.g., "8-12")
4. DO NOT use trailing commas in arrays or objects. For example:
   - CORRECT: ["item1", "item2"]
   - INCORRECT: ["item1", "item2",]
5. DO NOT split string values with commas.
   - CORRECT: ["Light cardio like walking"]
   - INCORRECT: ["Light cardio", "like walking"]
6. Each array element must be a complete string:
   - CORRECT: ["Progress gradually by increasing weight, reps, or sets"]
   - INCORRECT: ["Progress gradually by increasing weight", "reps", "or sets"]
7. Add nutrition tips that support the fitness goals
8. Your entire response must be valid JSON that can be parsed programmatically
9. DO NOT include explanation text outside the JSON structure
10. If a user has medical conditions, provide appropriate exercise modifications
11. Ensure the workout plan is safe, effective, and tailored to the user's goals
12. Make sure to add a suggested weekly schedule with rest days - start with "Suggested schedule", in the following format: "Suggested schedule: WEEKDAY - Day 1, WEEKDAY - Day 2, etc. ."`;
  }
}
