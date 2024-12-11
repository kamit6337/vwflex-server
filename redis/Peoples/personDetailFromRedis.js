import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getPersonDetailFromRedis = async (id) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  const get = await redisClient.get(`Person-Details:${id}`);
  return get ? JSON.parse(get) : null;
};

export const setPersonDetailIntoRedis = async (person) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  if (!person) return;

  await redisClient.set(
    `Person-Details:${person.id}`,
    JSON.stringify(person),
    "EX",
    3600
  );
};
