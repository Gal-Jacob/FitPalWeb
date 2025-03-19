import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    author: string;
    startTime: string;
    endTime: string;
    workout: string;
    details: string;
    imageUrl: string;
}

const postSchema: Schema<IPost> = new Schema({
    author: {
        type: String,
    },
    startTime: {
        type: String,
        required: true,
        trim: true,
    },
    endTime: {
        type: String,
        required: true,
        trim: true,
    },
    workout: {
        type: String,
    },
    details: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;