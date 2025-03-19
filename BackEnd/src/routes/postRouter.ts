import { Router } from 'express';

import PostController from '../controllers/postController';
import authMiddleware from '../utils/authMiddleware';

const postRouter = Router();
const postController = new PostController();

/**
 * @swagger
 * /api/post/user:
 *   get:
 *     summary: Get user posts
 *     tags: [Post]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: User posts retrieved successfully
 *       401:
 *         description: Unauthorized
 */
postRouter.get('/user', postController.getUserPosts);
// postRouter.get('/user', authMiddleware, postController.getUserPosts);

/**
 * @swagger
 * /api/post/all:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: All posts retrieved successfully
 *       401:
 *         description: Unauthorized
 */
postRouter.get('/all', authMiddleware, postController.getAllPosts);

/**
 * @swagger
 * /api/post/add:
 *   post:
 *     summary: Add a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               workout:
 *                 type: string
 *               details:
 *                 type: string
 *               imageUrl: 
 *                 type: string
 *     responses:
 *       201:
 *         description: Added user new post successfully
 *       400:
 *         description: Bad request
 */
postRouter.post('/add', postController.addNewPost);
// postRouter.post('/add', authMiddleware, postController.addNewPost);

export default postRouter;