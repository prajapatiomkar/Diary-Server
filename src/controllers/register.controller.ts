import { Request, Response, NextFunction } from "express";
import { CODES } from "../constants/status.code";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.insertOne({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    res.status(CODES.OK).json({ message: "register success!" });
  } catch (error) {
    next(error);
  }
};

export { registerController };
