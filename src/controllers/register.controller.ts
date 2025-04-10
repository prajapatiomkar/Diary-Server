import { Request, Response, NextFunction } from "express";
import { CODES } from "../constants/status.code";

const registerController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(CODES.OK).json({ message: "register success!" });
  } catch (error) {
    next(error);
  }
};

export { registerController };
