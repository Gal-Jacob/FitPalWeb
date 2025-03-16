import { Request, Response } from 'express';
import AuthService from '../services/authService';
import type { AuthServiceType } from '../services/authService';

class AuthController {
    private authService: AuthServiceType;

    constructor() {
        this.authService = new AuthService();
    }

    public registerUser = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    public loginUser = async (req: Request, res: Response) => {
        try {
            const token = await this.authService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };

    public googleAuth = async (req: Request, res: Response) => {
        try {
            const token = await this.authService.googleAuth(req.body);
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default AuthController;