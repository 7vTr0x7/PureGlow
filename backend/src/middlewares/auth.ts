import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";

interface DecodedToken {
  _id: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({ success: false, message: "Login First" });
      return; 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const user = await User.findById(decoded._id);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return; 
    }

    (req as AuthenticatedRequest).user = user;
    next(); 
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
    return; 
  }
};
