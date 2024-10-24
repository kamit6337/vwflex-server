import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getMoviePresentInUserWatchlist = async (userId, movieId) => {
  const check = checkRedisConnection();
  if (!check) return null;
  const get = await redisClient.sismember(
    `User-Watchlist-Movies:${userId}`,
    movieId
  );
  return !!get;
};

export const getUserWatchlistMoviesFromRedis = async (userId) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const movieIds = await redisClient.smembers(
    `User-Watchlist-Movies:${userId}`
  );

  if (!movieIds || movieIds.length === 0) return null;

  const promises = movieIds.map((id) => redisClient.get(`Movie:${id}`));
  const getMovies = await Promise.all(promises);
  const isMissingMovie = getMovies.some((movie) => !movie);
  if (isMissingMovie) {
    return null;
  }

  return getMovies.map((movie) => JSON.parse(movie));
};

export const setUserWatchlistMoviesIntoRedis = async (userId, movies) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !movies || movies.length === 0) return;

  const multi = redisClient.multi();

  for (const movie of movies) {
    multi.sadd(`User-Watchlist-Movies:${userId}`, movie.id);
    multi.set(`Movie:${movie.id}`, JSON.stringify(movie), "EX", 3600);
  }

  multi.expire(`User-Watchlist-Movies:${userId}`, 3600);

  await multi.exec();
};

export const setSingleUserWatchlistMovieIntoRedis = async (userId, movie) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !movie) return;

  await redisClient.sadd(`User-Watchlist-Movies:${userId}`, movie.id);
  await redisClient.set(`Movie:${movie.id}`, JSON.stringify(movie), "EX", 3600);
};

export const deleteSingleUserWatchlistMovieFromRedis = async (
  userId,
  movieId
) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !movieId) return;

  await redisClient.srem(`User-Watchlist-Movies:${userId}`, movieId);
};
