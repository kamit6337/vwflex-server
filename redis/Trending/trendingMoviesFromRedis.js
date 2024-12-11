import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getTrendingMoviesFromRedis = async (time) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  const get = await redisClient.get(`Trending-Movies:${time}`);
  if (!get) {
    return null;
  }

  const movieIds = JSON.parse(get);

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

export const setTrendingMoviesIntoRedis = async (time, movies) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  if (!time || !movies || movies.length === 0) return;

  const movieIds = movies.map((movie) => movie.id);

  await redisClient.set(
    `Trending-Movies:${time}`,
    JSON.stringify(movieIds),
    "EX",
    3600
  );

  const promises = movies.map((movie) =>
    redisClient.set(`Movie:${movie.id}`, JSON.stringify(movie), "EX", 3600)
  );

  await Promise.all(promises);
};
