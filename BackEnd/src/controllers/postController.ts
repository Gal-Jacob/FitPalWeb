import { Request, Response } from 'express';
import { PostService } from '../services/postService';
import { BACKEND_URL } from '../app';

class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public getUserPosts = async (req: Request, res: Response) => {
        try {
            const user = req.query.user as string | undefined;

            if (!user) {
                return res.status(404).json({ error: "User query parameter is required" });
            }

            return res.status(200).json(await this.postService.getUserPosts(user))
        } catch (error) {

            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public getAllPosts = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(await this.postService.getAllPosts());
        } catch (error) {

            return res.status(500).json({ message: 'Server error', error });
        }
    };

    public addNewPost = async (req: Request, res: Response) => {
        try {            
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
              }

            let data = req.body
            data.imageUrl = `${BACKEND_URL}/${req.file.path.replace(/\\/g, '/')}`

            await this.postService.addPost(data);
            return res.status(201).json({'message': 'Post added successfully'});
        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });

            } else {
                return  res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };

    public getPostsLikes = async (req: Request | any, res: Response) => {
        try {        

            const postId = req.query.postId as string | undefined;
            
            if (postId) {
                return res.status(200).json(await this.postService.getLikes(postId));
            } else {
                return res.status(400).json({ message: 'NO postId' });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });

            } else {
                return  res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };

    public handleLike = async (req: Request | any, res: Response) => {
        try {            
            let {postId} = req.body
            if (req.user.user_id) {
                console.log(req.user.user_id);
                const userId: string = req.user.user_id; 
                return res.status(201).json(await this.postService.likePost(userId, postId));
            }

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