import redisClient from "../redisClient.js";

export const getNewUserByRedis = async (email) => {
  const get = await redisClient.get(`New-Signup:${email}`);
  return get ? JSON.parse(get) : null;
};

export const getUserIdFromRedis = async (secretToken) => {
  if (!secretToken) return null;

  const get = await redisClient.get(`User-New-Passwrod:${secretToken}`);
  return get;
};

export const setNewUserToRedis = async (email, obj) => {
  if (!email || !obj) return;

  await redisClient.set(`New-Signup:${email}`, JSON.stringify(obj), "EX", 3600);
};

export const setUserIdIntoRedis = async (
  secretToken,
  userId,
  time = 15 * 60 // 15 minutes
) => {
  if (!secretToken || !userId) return;

  await redisClient.set(
    `User-New-Passwrod:${secretToken}`,
    userId.toString(),
    "EX",
    time
  );
};
