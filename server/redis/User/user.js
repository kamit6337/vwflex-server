import redisClient from "../redisClient.js";

export const getUserByIdRedis = async (userId) => {
  const get = await redisClient.get(`User-Id:${userId}`);
  return get ? JSON.parse(get) : null;
};

export const getUserByEmailRedis = async (email) => {
  const get = await redisClient.get(`User-Email:${email}`);
  return get ? JSON.parse(get) : null;
};

export const setUserIntoRedis = async (user) => {
  await redisClient.set(
    `User-Id:${user._id.toString()}`,
    JSON.stringify(user),
    "EX",
    3600
  );

  await redisClient.set(
    `User-Email:${user.email}`,
    JSON.stringify(user),
    "EX",
    3600
  );
};
