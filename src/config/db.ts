import mongoose from "mongoose";
import { serverConfig } from ".";

export async function connectToDatabase() {
  try {
    await mongoose.connect(serverConfig.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
