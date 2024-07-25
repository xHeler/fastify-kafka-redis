import { Config } from "../interfaces/config";

export const config: Config = {
  server: {
    host: process.env.SERVER_HOST || "0.0.0.0",
    port: parseInt(process.env.SERVER_PORT || "3000", 10),
  },
  redis: {
    host: process.env.REDIS_HOST || "redis",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },
};
