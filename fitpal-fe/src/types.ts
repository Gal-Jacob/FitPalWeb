export interface IComment {
  author: string;
  comment: string;
}

export interface ICommentsModalProps {
  postId: string;
  isOpen: boolean;
  closeModal: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export interface IPost {
  _id: string;
  id: string;
  author: string;
  startTime: Date;
  endTime: Date; 
  workout: string;
  details: string;
  imageUrl: string;
  likes: string[]; 
  comments: IComment[]; 
}

export interface IPostProps {
  props: IPost;
}

export interface IProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  height: string;
  weight: string;
  gender: "male" | "female";
}

export interface IExercise {
  name: string;
  sets: string | number;
  reps: string | string;
  restPeriod?: string;
  notes?: string;
}

export interface IGuideline {
  name: string;
  details: string;
}

export interface ISchedule {
  day: string;
  workout: string;
}

export interface IScheduleCardProps {
  schedule: ISchedule[];
}

export interface IWorkoutPlan {
  exercises: IExercise[];
}

interface IWorkoutDay {
  day: string;
  focus: string;
  exercises: IExercise[];
  warmup: string[];
  cooldown: string[];
}

export interface IWorkoutPlanProps {
  days: IWorkoutDay[];
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