import mongoose, { Document, Schema } from 'mongoose';

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
        required: true,
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

const User = mongoose.model<IPost>('Post', postSchema);

export default User;