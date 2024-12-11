import redisClient from "../redisClient.js";

export const getNewUserByRedis = async (email) => {
  const get = await redisClient.get(`New-Signup:${email}`);
  return get ? JSON.parse(get) : null;
};

export const setNewUserToRedis = async (email, obj) => {
  if (!email || !obj) return;

  await redisClient.set(`New-Signup:${email}`, JSON.stringify(obj), "EX", 3600);
};
