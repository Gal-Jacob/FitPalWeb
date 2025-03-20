import mongoose, { Schema, Document } from "mongoose";

// Exercise Schema
const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  restPeriod: { type: String, required: true },
  notes: { type: String }
});

// Workout Day Schema
const WorkoutDaySchema = new Schema({
  day: { type: String, required: true },
  focus: { type: String, required: true },
  exercises: [ExerciseSchema],
  warmup: [{ type: String }],
  cooldown: [{ type: String }]
});

// Main Workout Plan Schema
export interface IWorkoutPlan extends Document {
  email: string;
  summary: string;
  days: {
    day: string;
    focus: string;
    exercises: {
      name: string;
      sets: number;
      reps: string;
      restPeriod: string;
      notes?: string;
    }[];
    warmup: string[];
    cooldown: string[];
  }[];
  notes: string[];
  nutritionTips: string[];
  progressionPlan?: string;
}

const WorkoutPlanSchema = new Schema<IWorkoutPlan>({
  email: { type: String },
  summary: { type: String, required: true },
  days: [WorkoutDaySchema],
  notes: [{ type: String }],
  nutritionTips: [{ type: String }],
  progressionPlan: { type: String },
});

// Export Mongoose Model
export const WorkoutPlanMongoModel = mongoose.model<IWorkoutPlan>("WorkoutPlan", WorkoutPlanSchema);
