import { createClient } from "redis";
import { serverConfig } from ".";

export const redisClient = createClient({
  url: serverConfig.REDIS_URL,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

export async function InitRedis() {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log("Error in connecting Redis");
    throw error;
  }
}

export async function closeRedis() {
  try {
    await redisClient.quit();
    console.log("Redis connection closed");
  } catch (error) {
    console.log("Error in closing Redis connection");
    throw error;
  }
}
