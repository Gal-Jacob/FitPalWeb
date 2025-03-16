import { Request, Response } from 'express';
import { UserService } from '../services/userService';

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
            res.status(200).json(userProfile);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
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
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    };
}

export default UserController;