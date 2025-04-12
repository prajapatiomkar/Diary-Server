import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { registerController } from "../controllers/register.controller";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema), loginController);
authRouter.post("/register", validate(registerSchema), registerController);

export { authRouter };
