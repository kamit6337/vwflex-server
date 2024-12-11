import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getMovieDetailFromRedis = async (id) => {
  if (!checkRedisConnection) {
    return null;
  }
  const get = await redisClient.get(`Movie_Detail:${id}`);
  return get ? JSON.parse(get) : null;
};

export const setMovieDetailToRedis = async (movie) => {
  if (!checkRedisConnection) {
    return null;
  }
  if (!movie) return;

  await redisClient.set(
    `Movie_Detail:${movie.id}`,
    JSON.stringify(movie),
    "EX",
    3600
  );
};
