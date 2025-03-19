import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    googleId?: string;
    accessToken?: string;
    refreshToken?: string;
    lastWorkoutGenerated?: Date;
    workout?: object;
    height?: number;
    weight?: number;
    image?: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: String,
    },
    refreshToken: {
      type: String,
      trim: true,
    },
    accessToken: {
      type: String,
      trim: true,
    },
    lastWorkoutGenerated: {
      type: Date,
    },
    workout: { 
      type: Object,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    image: {
      type: String,
    }

}, { timestamps: true });

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
