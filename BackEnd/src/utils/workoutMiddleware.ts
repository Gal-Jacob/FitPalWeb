// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { WorkoutPlanRequest } from "../utils/types";
import User from "../db/models/userModel";

/**
 * Validates the workout plan request body
 */
/**
 * Middleware to validate the workout plan request.
 *
 * This middleware checks for the presence and validity of the required fields
 * in the request body: `fitnessLevel`, `goals`, and `availability`.
 *
 * - `fitnessLevel` must be one of the following values: "beginner", "intermediate", "advanced".
 * - `goals` must be provided.
 * - `availability` must be a number between 1 and 7.
 *
 * If any of these validations fail, a 400 status code response is sent with an appropriate error message.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 *
 * @returns A 400 status code response with an error message if validation fails, otherwise calls the next middleware.
 */
export const validateWorkoutPlanRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const today = new Date().toISOString().split("T")[0];
    const lastGenerationDate = user.lastWorkoutGenerated
      ? user.lastWorkoutGenerated.toISOString().split("T")[0]
      : null;

    if (lastGenerationDate === today) {
      return res.status(400).json({
        success: false,
        message: "Workout plan already generated for today",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }

  const { fitnessLevel, goals, availability } = req.body.data as WorkoutPlanRequest;

console.log({ fitnessLevel, goals, availability });


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

  const validFitnessLevels = ["beginner", "intermediate", "advanced"];
  if (!validFitnessLevels.includes(fitnessLevel)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid fitness level. Must be beginner, intermediate, or advanced",
    });
  }

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
