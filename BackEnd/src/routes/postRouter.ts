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
// postRouter.get('/user', postController.getUserPosts);
postRouter.get('/user', authMiddleware, postController.getUserPosts);

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
// postRouter.get('/all', postController.getAllPosts);
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
postRouter.post('/add',authMiddleware, multerUpload.single('image'), postController.addNewPost);


/**
 * @swagger
 * /api/post/like:
 *   get:
 *     summary: Get all posts (optionally filter by user)
 *     tags: [Post]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         required: false
 *         description: get post by postId
 *     responses:
 *       200:
 *         description: Get post likes successfully
 *       401:
 *         description: Unauthorized
 */
// postRouter.get('/like', postController.getPostsLikes);
postRouter.get('/like', authMiddleware, postController.getPostsLikes);

/**
 * @swagger
 * /api/post/like:
 *   put:
 *     summary: Add a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Like or unlike user post successfully
 *       400:
 *         description: Bad request
 */
// postRouter.put('/like', postController.handleLike);
postRouter.put('/like', authMiddleware, postController.handleLike);

/**
 * @swagger
 * /api/post/comments:
 *   get:
 *     summary: Get all posts (optionally filter by user)
 *     tags: [Post]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         required: false
 *         description: get post by postId
 *     responses:
 *       200:
 *         description: Get post comments successfully
 *       401:
 *         description: Unauthorized
 */
postRouter.get('/comments', authMiddleware, postController.getPostsComments);

/**
 * @swagger
 * /api/post/comments:
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
 *               postId:
 *                 type: string
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Added new comment on user post successfully
 *       400:
 *         description: Bad request
 */
postRouter.post('/comments', authMiddleware, postController.handleNewComment);

export default postRouter;