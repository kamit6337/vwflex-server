import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getTrendingPeoplesFromRedis = async (time) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const get = await redisClient.get(`Trending-Peoples:${time}`);

  if (!get) {
    return null;
  }

  const peoplesId = JSON.parse(get);

  if (!peoplesId || peoplesId.length === 0) return null;

  const promises = peoplesId.map((id) => redisClient.get(`People:${id}`));
  const peoples = await Promise.all(promises);
  const isMissing = peoples.some((data) => !data);
  if (isMissing) {
    return null;
  }
  return peoples.map((movie) => JSON.parse(movie));
};

export const setTrendingPeoplesIntoRedis = async (time, peoples) => {
  const check = checkRedisConnection();
  if (!check) return null;

  if (!time || !peoples || peoples.length === 0) return;

  const peoplesId = peoples.map((people) => people.id);

  await redisClient.set(
    `Trending-Peoples:${time}`,
    JSON.stringify(peoplesId),
    "EX",
    3600
  );

  const promises = peoples.map((people) =>
    redisClient.set(`People:${people.id}`, JSON.stringify(people), "EX", 3600)
  );

  await Promise.all(promises);
};
