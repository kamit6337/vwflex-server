import redisClient from "../redisClient.js";

export const getUserByIdRedis = async (userId) => {
  const get = await redisClient.get(`User:${userId}`);
  return get ? JSON.parse(get) : null;
};

export const setUserIntoRedis = async (user) => {
  await redisClient.set(
    `User:${user._id.toString()}`,
    JSON.stringify(user),
    "EX",
    3600
  );
};
