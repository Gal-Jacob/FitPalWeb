import Post, { IPost } from '../db/models/postModel';

export class PostService {
    async getUserPosts(user: string) {
        return await Post.find({author: user}).exec();
    }

    async getAllPosts() {
        return await Post.find();
    }

    async addPost(post: IPost) {
        const newPost = new Post(post);
        await newPost.save(); // Save to MongoDB
        return
    }
}