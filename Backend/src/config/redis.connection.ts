import { createClient } from "redis";

// create a redis client with createClient method by passing options as parameter
const redisClient = createClient({
  url: process.env.REDIS_URL,
});


redisClient.on("error", (err: Error) =>
  console.log("Redis Client Error", err),
);

export const redisConnection = async () => {
  await redisClient.connect();
  console.log("Redis connected successfully!");
};

export default redisClient;