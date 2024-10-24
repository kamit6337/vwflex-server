import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getTvShowDetailFromRedis = async (tvId) => {
  const check = checkRedisConnection();

  if (!check) {
    return null;
  }

  const get = await redisClient.get(`TV-Details:${tvId}`);

  return get ? JSON.parse(get) : null;
};

export const setTvShowDetailIntoRedis = async (data) => {
  const check = checkRedisConnection();

  if (!check) {
    return null;
  }

  await redisClient.set(
    `TV-Details:${data.id}`,
    JSON.stringify(data),
    "EX",
    3600
  );
};
