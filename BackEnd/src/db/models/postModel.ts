import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export interface IPost extends Document {
    id: string;
    author: string;
    startTime: string;
    endTime: string;
    workout: string;
    details: string;
    imageUrl: string;
}

const postSchema: Schema<IPost> = new Schema({
    id: {
        type: String,
        default: uuidv4, // Automatically generates a UUID
        unique: true,
        trim: true,
    },
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