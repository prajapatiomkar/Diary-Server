import { Request, Response, NextFunction } from "express";
import { CODES } from "../constants/status.code";

const loginController = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(CODES.OK).json({
      message: "login success!",
    });
  } catch (error) {
    next(error);
  }
};

export { loginController };
