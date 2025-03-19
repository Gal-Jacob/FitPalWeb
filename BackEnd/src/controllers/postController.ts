import { Request, Response } from 'express';
import { PostService } from '../services/postService';

class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public getUserPosts = async (req: Request, res: Response) => {
        try {
            const user = (req as any).user.id;
            return res.status(200).json(this.postService.getUserPosts(user));
        } catch (error) {

            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public getAllPosts = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(this.postService.getAllPosts());
        } catch (error) {

            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public addNewPost = async (req: Request, res: Response) => {
        try {
            await this.postService.addPost(req.body);
            return res.status(201).json({'message': 'Post added successfully'});
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