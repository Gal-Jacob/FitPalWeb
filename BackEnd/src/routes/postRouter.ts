import { Router } from 'express';

import PostController from '../controllers/postController';
import authMiddleware from '../utils/authMiddleware';
import multerUpload from '../utils/multerFilesUpload'; // Import Multer configuration

const postRouter = Router();
const postController = new PostController();

/**
 * @swagger
 * /api/post/user:
 *   get:
 *     summary: Get all posts (optionally filter by user)
 *     tags: [Post]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter posts by user (author)
 *     responses:
 *       200:
 *         description: All posts retrieved successfully
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
postRouter.get('/all', postController.getAllPosts);
// postRouter.get('/all', authMiddleware, postController.getAllPosts);

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
postRouter.post('/add', multerUpload.single('image'), postController.addNewPost);
// postRouter.post('/add', authMiddleware, postController.addNewPost);

export default postRouter;