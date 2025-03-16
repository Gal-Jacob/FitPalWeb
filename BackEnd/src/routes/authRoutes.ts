import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/google', authController.googleAuth);

export default router;