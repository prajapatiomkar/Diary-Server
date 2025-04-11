import express, { Request, Response, NextFunction } from "express";
import { ENV } from "./constants/environment";
import { logger } from "./utils/logger";
import { authRouter } from "./routes/auth.route";
import { CODES } from "./constants/status.code";
import { passport } from "./utils/passport";
import { db } from "./utils/database";
import helmet from "helmet";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(passport.initialize());

db();

app.use("/auth", authRouter);
app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("profile reaching");
    res.json({ message: "This is a protected profile route", user: req.user });
  }
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(CODES.NOT_FOUND).json({
    error: {
      message: "Route not found",
    },
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message || "Internal Server Error"}`);
  res.status(err.status || CODES.INTERNAL_SERVER_ERROR).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(ENV.PORT, () => {
  logger.info(`server is up and running at port ${ENV.PORT}`);
});
