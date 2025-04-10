import { Request, Response, NextFunction } from "express";
import { CODES } from "../constants/status.code";
import bcrypt from "bcryptjs";
import { ENV } from "../constants/environment";
import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../models/user.model";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ _id: user?._id }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN,
    } as SignOptions);

    res.status(CODES.CREATED).json({ token });
  } catch (error) {
    next(error);
  }
};

export { loginController };
