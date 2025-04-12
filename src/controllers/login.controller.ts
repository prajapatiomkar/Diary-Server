import { Request, Response, NextFunction } from "express";
import { CODES } from "../constants/status.code";
import bcrypt from "bcryptjs";
import { ENV } from "../constants/environment";
import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../models/user.model";

interface LoginRequestBody {
  email: string;
  password: string;
}
const loginController = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(CODES.UNAUTHORIZED).json({
        message: "Invalid credentials.",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password as string
    );

    if (!isPasswordValid) {
      res.status(CODES.UNAUTHORIZED).json({
        message: "Invalid credentials.",
      });
      return;
    }

    const token = jwt.sign({ _id: user?._id }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN,
    } as SignOptions);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(CODES.OK)
      .json({
        message: "Login successful.",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      });
  } catch (error) {
    next(error);
  }
};

export { loginController };
