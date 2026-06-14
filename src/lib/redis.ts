import { createClient } from "redis";

export const redis = createClient({
  url: "redis://localhost:6379"
});

redis.on("error", console.error);

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.connect();