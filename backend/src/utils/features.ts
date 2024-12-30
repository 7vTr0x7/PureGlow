import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../models/user.model";



export const sendCookies = (
  user: IUser,
  res: Response,
  message: string
): Response => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV !== "Development",
    })
    .json({ success: true, message, token,user });
};
