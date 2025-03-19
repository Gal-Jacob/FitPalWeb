import { WorkoutPlan, WorkoutDay, Exercise } from "./types";

/**
 * Parses a JSON string into a structured WorkoutPlan object
 * @param jsonText JSON string from response
 * @returns Structured WorkoutPlan object
 */
export function parseWorkoutPlanFromJson(jsonText: string): WorkoutPlan {
  try {
    // Extract JSON object from text if needed
    const jsonRegex = /{[\s\S]*}/;
    const match = jsonText.match(jsonRegex);

    if (!match) {
      return createDefaultWorkoutPlan("No valid JSON found in the response");
    }

    let jsonString = match[0];

    // Common JSON fixes
    jsonString = jsonString
      // Fix ranges in reps (e.g., 8-12 should be "8-12")
      .replace(/"reps":\s*(\d+)-(\d+)/g, '"reps": "$1-$2"')
      // Fix trailing commas in arrays
      .replace(/,(\s*)\]/g, "$1]")
      // Fix missing commas between objects in arrays
      .replace(/}(\s*)\n(\s*){/g, "},\n$2{");

    const data = JSON.parse(jsonString);

    // Validate expected structure
    if (!data.summary || !Array.isArray(data.days)) {
      return createDefaultWorkoutPlan("Invalid workout plan structure");
    }

    // Process workout days
    const days: WorkoutDay[] = data.days.map((day: any) => {
      // Convert exercise data
      const exercises: Exercise[] = Array.isArray(day.exercises)
        ? day.exercises.map((ex: any) => ({
            name: ex.name,
            sets: typeof ex.sets === "string" ? parseInt(ex.sets) : ex.sets,
            reps: ex.reps,
            restPeriod: ex.restPeriod,
            notes: ex.notes,
          }))
        : [];

      return {
        day: day.day,
        focus: day.focus,
        exercises: exercises,
        warmup: Array.isArray(day.warmup) ? day.warmup : [],
        cooldown: Array.isArray(day.cooldown) ? day.cooldown : [],
        notes: day.notes,
      };
    });

    return {
      summary: data.summary,
      days: days,
      notes: Array.isArray(data.notes) ? data.notes : [],
      nutritionTips: Array.isArray(data.nutritionTips)
        ? data.nutritionTips
        : [],
    };
  } catch (error) {
    console.error("Error parsing workout JSON:", error);
    return createDefaultWorkoutPlan("JSON parsing failed");
  }
}

/**
 * Create a default workout plan when parsing fails
 */
function createDefaultWorkoutPlan(reason: string): WorkoutPlan {
  return {
    summary: "Basic workout plan",
    days: [
      {
        day: "Day 1",
        focus: "Full Body",
        exercises: [
          {
            name: "Push-ups",
            sets: 3,
            reps: "10-15",
            restPeriod: "60 seconds",
          },
          { name: "Squats", sets: 3, reps: "10-15", restPeriod: "60 seconds" },
          {
            name: "Plank",
            sets: 3,
            reps: "30 seconds",
            restPeriod: "60 seconds",
          },
        ],
        warmup: ["Light cardio", "Joint rotations"],
        cooldown: ["Full body stretch"],
      },
    ],
    notes: [`A standard workout plan was created because: ${reason}`],
    nutritionTips: [
      "Stay hydrated",
      "Eat a balanced diet with plenty of protein",
    ],
  };
}
