import User, { IUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    async validateUser(email: string, password: string): Promise<IUser | null> {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    generateToken(user: IUser): string {
        const payload = { id: user._id, email: user.email };
        return jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    }

    async googleAuth(googleId: string): Promise<IUser | null> {
        const user = await User.findOne({ googleId });
        if (user) {
            return user;
        }
        return null;
    }
}

export default AuthService;