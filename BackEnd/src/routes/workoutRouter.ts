import { Router } from "express";

import WorkoutController from "../controllers/workoutController";
import { validateWorkoutPlanRequest } from "../utils/workoutMiddleware";

const workoutRouter = Router();
const workoutController = new WorkoutController();

/**
 * @swagger
 * /api/workout/generate:
 *   post:
 *     summary: Generate a workout plan
 *     tags: [Workout]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               duration:
 *                 type: integer
 *                 description: Duration of the workout in minutes
 *               intensity:
 *                 type: string
 *                 description: Intensity level of the workout
 *     responses:
 *       200:
 *         description: Workout plan generated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
workoutRouter.post(
  "/generate",
  validateWorkoutPlanRequest,
  workoutController.generateWorkoutPlan.bind(workoutController)
);

export default workoutRouter;
