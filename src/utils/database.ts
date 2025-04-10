import mongoose from "mongoose";
import { logger } from "./logger";
import { ENV } from "../constants/environment";

export const db = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    // Check if mongoose is connected
    if (conn.connection.readyState === 1) {
      logger.info("mongodb connection established successfully");
    }
  } catch (error) {
    logger.error(error);
  }
};
