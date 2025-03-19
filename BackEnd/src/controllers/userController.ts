import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { BACKEND_URL } from '../app';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUserProfile = async (req: Request, res: Response) => {
        try {
            const email = (req as any).user.email;
            const userProfile = await this.userService.findUserByEmail(email);

            if (!userProfile) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(userProfile);
        } catch (error) {

            return res.status(500).json({ message: 'Server error', error });
        }
    }

    public updateUserProfile = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id; 
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

    public patchUserProfile = async (req: Request, res: Response) => {
        try {
            const userEmail = (req as any).user.email; 
            const { firstName, lastName, height, weight} = req.body;

            const updatedData: any = {};
            if (firstName !== undefined) updatedData.firstName = firstName;
            if (lastName !== undefined) updatedData.lastName = lastName;
            if (height !== undefined) updatedData.height = height;
            if (weight !== undefined) updatedData.weight = weight;

            const updatedUser = await this.userService.updateUserByEmail(userEmail, updatedData);

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public patchUserPhoto = async (req: Request | any, res: Response) => {
        const userEmail = (req as any).user.email; 
        const image = req.image; 

        if (!image) {
            return res.status(400).json({ message: 'No photo uploaded' });
        }

        const updatedData: any = {};
        updatedData.image = `${BACKEND_URL}/${image.path.replace(/\\/g, '/')}`;

        try {
            const updatedUser = await this.userService.updateUserByEmail(userEmail, updatedData);

            if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    };


    public registerUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.register(req.body);

            return res.status(201).json(user);

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });

            } else {
                return  res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };

    public loginUser = async (req: Request, res: Response) => {
        try {
            const token = await this.userService.login(req.body);

            return res.status(200).json({ token });

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
                
            } else {
                return res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };

    public searchUsersByEmail = async (req: Request, res: Response) => {
        try {
            const { email } = req.query;
            if (!email || typeof email !== 'string') {
                return res.status(400).json({ message: 'Invalid email query parameter' });
            }
            
            const users = await this.userService.findUserByEmail(email);
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    };
}

export default UserController;