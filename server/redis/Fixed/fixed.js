import redisClient from "../redisClient.js";

export const getFixedFromRedis = async () => {
  const get = await redisClient.get("Fixed");

  return get ? JSON.parse(get) : null;
};

export const setFixedToRedis = async (data) => {
  if (!data) return;

  await redisClient.set("Fixed", JSON.stringify(data));
};
