export interface User {
  id: string;
  email: string;
  password?: string;
  googleId?: string;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface GoogleAuthPayload {
  idToken: string;
}

export type WorkoutPlanRequest = {
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  goals: string[];
  availability: number;
  duration: number;
  intensity: string;
  medicalConditions?: string[];
  preferences?: string[];
  equipment?: string[];
};

export type WorkoutPlanResponse =
  | { success: true; plan: WorkoutPlan }
  | { success: false; error: string };

export interface WorkoutPlan {
  summary: string;
  days: WorkoutDay[];
  notes?: string[];
  nutritionTips?: string[];
  progressionPlan?: string;
}

export interface Workout {
  name: string;
  duration: number;
  intensity: string;
  equipment?: string[];
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number | string;
  duration?: string;
  restPeriod?: string;
  notes?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  warmup?: string[];
  cooldown?: string[];
  notes?: string;
}
