import User, { IUser } from '../models/userModel';

export class UserService {
    async findUserById(userId: string) {
        return await User.findById(userId).exec();
    }

    async updateUser(userId: string, updateData: Partial<IUser>) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    }
}