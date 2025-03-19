// src/utils/workoutJsonParser.ts
import { WorkoutPlan, WorkoutDay, Exercise } from "./types";

/**
 * Parses a JSON string from AI into a structured WorkoutPlan object
 * @param jsonText JSON string from AI response
 * @returns Structured WorkoutPlan object
 */
export function parseWorkoutPlanFromJson(jsonText: string): WorkoutPlan {
  try {
    const jsonRegex = /{[\s\S]*}/;
    const match = jsonText.match(jsonRegex);

    if (!match) {
      throw new Error("No valid JSON found in the response");
    }

    const jsonString = match[0];
    console.log(jsonString);
    const data = JSON.parse(jsonString);
    console.log(data);

    if (!data.summary || !Array.isArray(data.days)) {
      throw new Error("Invalid workout plan format: missing summary or days");
    }

    console.log(data);
    const days: WorkoutDay[] = data.days.map((day: any) => {
      const exercises: Exercise[] = day.exercises.map((ex: any) => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        restPeriod: ex.restPeriod,
        notes: ex.notes,
      }));

      return {
        day: day.day,
        focus: day.focus,
        exercises: exercises,
        warmup: day.warmup,
        cooldown: day.cooldown,
        notes: day.notes,
      };
    });

    return {
      summary: data.summary,
      days: days,
      notes: data.notes,
      nutritionTips: data.nutritionTips,
    };
  } catch (error) {
    console.error("Error parsing workout JSON:", error);
    throw new Error(
      `Failed to parse workout plan: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
