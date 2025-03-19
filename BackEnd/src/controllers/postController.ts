import { Request, Response } from 'express';
import { UserService } from '../services/userService';

class PostController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUserPosts = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            //TODO: get user posts

            return res.status(200).json(userId);
        } catch (error) {

            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public getAllPosts = async (req: Request, res: Response) => {
        try {
            //TODO: get all posts

            return res.status(200).json({});
        } catch (error) {

            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public addNewPost = async (req: Request, res: Response) => {
        try {
            //TODO: add new post
            //const user = await this.postService.register(req.body);

            return res.status(201).json({});
        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });

            } else {
                return  res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };
}

export default PostController;