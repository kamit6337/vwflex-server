import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getMovieFromRedis = async (uniqueName, page, limit) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const skip = (page - 1) * limit;

  const movieIds = await redisClient.zrange(uniqueName, skip, skip + limit - 1);

  if (!movieIds || movieIds.length === 0) {
    return null;
  }

  const promises = movieIds.map((id) => redisClient.get(`Movie:${id}`));
  const getMovies = await Promise.all(promises);
  const isMissingMovie = getMovies.some((movie) => !movie);
  if (isMissingMovie) {
    return null;
  }

  return getMovies.map((movie) => JSON.parse(movie));
};

export const setMovieToRedis = async (uniqueName, movies) => {
  const check = checkRedisConnection();
  if (!check) return null;

  if (!movies || movies.length === 0) return;

  const multi = redisClient.multi();

  let baseTime = Date.now();

  for (const movie of movies) {
    baseTime = baseTime + 1; // Ensures unique timestamp

    multi.zadd(uniqueName, baseTime, movie.id);
    multi.set(`Movie:${movie.id}`, JSON.stringify(movie), "EX", 3600);
  }

  multi.expire(uniqueName, 3600);

  await multi.exec();
};
