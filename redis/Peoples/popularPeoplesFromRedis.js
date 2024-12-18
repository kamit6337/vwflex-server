import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getPopularPeoplesFromRedis = async (page, limit = 20) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const skip = (page - 1) * limit;

  const peoplesId = await redisClient.zrange(
    "Popular-Peoples",
    skip,
    skip + limit - 1
  );

  if (!peoplesId || peoplesId.length === 0) {
    return null;
  }

  const promises = peoplesId.map((id) => redisClient.get(`People:${id}`));
  const get = await Promise.all(promises);
  const isMissing = get.some((data) => !data);
  if (isMissing) {
    return null;
  }
  return get.map((movie) => JSON.parse(movie));
};

export const setPopularPeoplesIntoRedis = async (peoples) => {
  const check = checkRedisConnection();
  if (!check) return null;

  if (!peoples || peoples.length === 0) return;

  const multi = redisClient.multi();

  let baseTime = Date.now();

  for (const people of peoples) {
    baseTime = baseTime + 1;

    multi.zadd("Popular-Peoples", baseTime, people.id);
    multi.set(`People:${people.id}`, JSON.stringify(people), "EX", 3600);
  }

  // peoples.forEach((people, index) => {
  //   const updatedTime = baseTime + index;

  //   multi.zadd("Popular-Peoples", updatedTime, people.id);
  //   multi.set(`People:${people.id}`, JSON.stringify(people), "EX", 3600);
  // });

  multi.expire("Popular-Peoples", 3600);

  await multi.exec();
};
