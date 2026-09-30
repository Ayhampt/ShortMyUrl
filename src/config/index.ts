// This file contains all the basic configuration logic for the app server to work
import dotenv from "dotenv";

type serverConfig = {
  PORT: number;
  MONGO_URI: string;
  REDIS_URL: string;
  REDIS_COUNTER_KEY: string;
};

function loadEnv() {
  dotenv.config();
  console.log("environment variables loaded");
}
loadEnv();

export const serverConfig: serverConfig = {
  PORT: Number(process.env.PORT) || 8002,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/short_my_url",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6378",
  REDIS_COUNTER_KEY: process.env.REDIS_COUNTER_KEY || "short_my_url_counter",
};
