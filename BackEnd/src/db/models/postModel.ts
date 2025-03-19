import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export interface IPost extends Document {
    id: string;
    author: string;
    startTime: Date;
    endTime: Date; 
    workout: string;
    details: string;
    imageUrl: string;
    likes: string[]; 
    comments: { author: string; comment: string }[]; 
}

const postSchema: Schema<IPost> = new Schema({
    id: {
        type: String,
        default: uuidv4, // Automatically generates a UUID
        unique: true,     // Ensure the id is unique
        trim: true,
    },
    author: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    workout: { type: String, required: true },
    details: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    likes: [{ type: String }], 
    comments: [{
        author: { type: String, required: true }, 
        comment: { type: String, required: true }, 
    }],
}, { timestamps: true });

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;