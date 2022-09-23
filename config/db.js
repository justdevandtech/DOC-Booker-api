import "dotenv/config";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
   mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
