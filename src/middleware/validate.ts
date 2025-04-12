import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ENV } from "../constants/environment";
import { CODES } from "../constants/status.code";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(CODES.BAD_REQUEST).json({
          message: "Validation failed",
          errors: err.errors,
        });
        return;
      }
      res
        .status(CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

export { validate };
