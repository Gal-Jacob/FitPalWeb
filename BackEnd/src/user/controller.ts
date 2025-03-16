import { Request, Response } from 'express';
import { UserService } from './service';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUserProfile = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const userProfile = await this.userService.findUserById(userId);
            if (!userProfile) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(userProfile);
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public updateUserProfile = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const updatedData = req.body;
            const updatedUser = await this.userService.updateUser(userId, updatedData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public registerUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };

    public loginUser = async (req: Request, res: Response) => {
        try {
            const token = await this.userService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };
}

export default UserController;