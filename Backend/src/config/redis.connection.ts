import { createClient } from "redis";

// create a redis client with createClient method by passing url as parameter
const redisClient = createClient({
  url: "redis://localhost:6381",
  // url: "redis://redis-stack:6379"  for docker based redis connection
});


redisClient.on("error", (err: Error) =>
  console.log("Redis Client Error", err),
);

export const redisConnection = async () => {
  await redisClient.connect();
  console.log("Redis connected successfully!");
};

export default redisClient;