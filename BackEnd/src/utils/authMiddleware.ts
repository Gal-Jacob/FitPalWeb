import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import axios from "axios";


interface AuthenticatedRequest extends Request {
  user?: any;
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // CheckJ WT from username and pass
    const secret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secret);
    next();
  } catch (err) {
    // Check JWT from google
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
      req.user = response.data; // Store user info in request
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  }
};

export default authMiddleware;