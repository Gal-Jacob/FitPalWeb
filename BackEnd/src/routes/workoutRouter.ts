import { Router } from "express";

import WorkoutController from "../controllers/workoutController";
import { validateWorkoutPlanRequest } from "../utils/workoutMiddleware";

const workoutRouter = Router();
const workoutController = new WorkoutController();

/**
 * @swagger
 * /api/workout/generate/{userId}:
 *   post:
 *     summary: Generate a workout plan
 *     tags: [Workout]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fitnessLevel:
 *                 type: string
 *                 description: Fitness level of the user
 *               goals:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Fitness goals of the user
 *               availability:
 *                 type: integer
 *                 description: Number of days available for workout per week
 *               duration:
 *                 type: integer
 *                 description: Duration of the workout in minutes
 *               intensity:
 *                 type: string
 *                 description: Intensity level of the workout
 *               equipment:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Equipment available for the workout
 *               medicalConditions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Medical conditions of the user
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Workout preferences of the user
 *     responses:
 *       200:
 *         description: Workout plan generated successfully
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, user does not have access
 *       422:
 *         description: Unprocessable Entity, validation error
 *       500:
 *         description: Internal server error
 */
workoutRouter.post(
  "/generate/:userId",
  validateWorkoutPlanRequest,
  workoutController.generateWorkoutPlan.bind(workoutController)
);

export default workoutRouter;
