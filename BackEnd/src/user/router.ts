import { Router } from 'express';

import passport from 'passport';
import UserController from './controller';
import authMiddleware from './middleware';

const router = Router();
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
router.get('/profile', authMiddleware, userController.getUserProfile);

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
router.put('/profile', authMiddleware, userController.updateUserProfile);

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
router.post('/register', userController.registerUser);

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
router.post('/login', userController.loginUser);


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
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

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
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
  const token = req.user ? (req.user as any).accessToken : null; 

  if (token) {
    res.redirect(`${frontendUrl}?token=${token}`);
  } else {
    res.redirect(frontendUrl);
  }
}
);


export default router;