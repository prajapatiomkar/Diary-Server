import { Request, Response, NextFunction } from "express";
import { CODES } from "../constants/status.code";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

interface RegisterRequestBody {
  email: string;
  username: string;
  password: string;
}
const registerController = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(CODES.CONFLICT).json({
        message: "User already exists with this email.",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.insertOne({
      email,
      username,
      password: hashedPassword,
    });

    console.log(createUser);
    res.status(CODES.CREATED).json({
      message: "User registered successfully.",
      user: {
        _id: createUser._id,
        email,
        username,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { registerController };
