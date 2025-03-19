import Post, { IComment, IPost } from '../db/models/postModel';

export class PostService {
    async getUserPosts(user: string) {
        return await Post.find({author: user}).exec();
    }

    async getAllPosts() {
        return await Post.find();
    }

    async addPost(post: IPost) {
        post.likes = []
        post.comments = []
        const newPost = new Post(post);
        await newPost.save(); 
        return
    }

    async getLikes(postId: string) {
          const post = await Post.findById(postId)
          if (post) {
            return { likes: post.likes.length, users: post.likes };
          } 
      };

    async likePost(userId: string, postId: string) {

        const post = await Post.findById(postId);
        if (post) {
            const alreadyLiked = post.likes.includes(userId);
            if (alreadyLiked) {
              // Unlike post
              post.likes = post.likes.filter((id) => id.toString() !== userId);
            } else {
              // Like post
              post.likes.push(userId);
            }
        
            await post.save();
        }
        return this.getLikes(postId)
    }

    async getPostsComments(postId: string) {
          const post = await Post.findById(postId)
          if (post) {
            return { comments: post.comments };
          } 
      };

    async handleNewComment(userEmail: string, comment: string, postId: string) {
        const post = await Post.findById(postId);
        if (post) {
            post.comments.push({author: userEmail, comment: comment});
            await post.save();
        }
        return this.getPostsComments(postId)
    }
}