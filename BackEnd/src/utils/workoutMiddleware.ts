// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { WorkoutPlanRequest } from "../utils/types";

/**
 * Validates the workout plan request body
 */
export const validateWorkoutPlanRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fitnessLevel, goals, availability } = req.body as WorkoutPlanRequest;

  // Check required fields
  if (!fitnessLevel) {
    return res.status(400).json({
      success: false,
      message: "Fitness level is required",
    });
  }

  if (!goals) {
    return res.status(400).json({
      success: false,
      message: "Fitness goals are required",
    });
  }

  if (!availability) {
    return res.status(400).json({
      success: false,
      message: "Weekly availability is required",
    });
  }

  // Validate fitness level
  const validFitnessLevels = ["beginner", "intermediate", "advanced"];
  if (!validFitnessLevels.includes(fitnessLevel)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid fitness level. Must be beginner, intermediate, or advanced",
    });
  }

  // Validate availability
  if (
    typeof availability !== "number" ||
    availability < 1 ||
    availability > 7
  ) {
    return res.status(400).json({
      success: false,
      message: "Availability must be a number between 1 and 7",
    });
  }

  next();
};
