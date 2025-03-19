import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../db/models/userModel";

export class UserService {
  async findUserById(userId: string) {
    return await User.findById(userId).exec();
  }

  async updateUser(userId: string, updateData: Partial<IUser>) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).exec();
  }

  async updateUserByEmail(email: string, updateData: Partial<IUser>) {
    return await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    }).exec();
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  generateToken(user: IUser): string {
    const payload = { id: user._id, email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1h" });
  }

  async register(userData: any): Promise<IUser> {
    const { email, password, firstName, lastName } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await user.save();
    return user;
  }
  
  async findUserByEmail(email: string) {
      return await User.findOne({ email }).exec();
  }

  async login(userData: any): Promise<string> {
    const { email, password } = userData;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    return this.generateToken(user);
  }
}
