import { SigningOptions } from "crypto";
import dotenv from "dotenv";
import { PrivateKey, Secret } from "jsonwebtoken";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET as PrivateKey,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  MONGO_URI: process.env.MONGO_URI as string,
};
