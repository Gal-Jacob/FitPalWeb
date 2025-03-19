import { Router } from 'express';

import passport from 'passport';
import UserController from '../controllers/userController';
import authMiddleware from '../utils/authMiddleware';

const userRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/profile', authMiddleware, userController.getUserProfile);

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.put('/profile', authMiddleware, userController.updateUserProfile);

/**
 * @swagger
 * /api/user/profile:
 *   patch:
 *     summary: Partially update user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *               height:
 *                 type: integer
 *                 description: The user's height in cm
 *               weight:
 *                 type: integer
 *                 description: The user's weight in kg
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 height:
 *                   type: integer
 *                 weight:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.patch('/profile', authMiddleware, userController.patchUserProfile);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName: 
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
userRouter.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 */
userRouter.post('/login', userController.loginUser);


/**
 * @swagger
 * /api/user/google:
 *   get:
 *     summary: Authenticate with Google
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Bad request
 */
userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /api/user/google:
 *   get:
 *     summary: Authenticate with Google
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Bad request
 */
userRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';  
  const token = req.user ? (req.user as any).accessToken : null; 

  if (token) {
    res.redirect(`${frontendUrl}?token=${token}`);
  } else {
    res.redirect(frontendUrl);
  }
}
);


export default userRouter;