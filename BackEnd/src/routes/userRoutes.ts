import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);

export default router;