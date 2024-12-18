import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getMoviePresentInUserWatchlist = async (userId, movieId) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const score = await redisClient.zscore(
    `User-Watchlist-Movies:${userId}`,
    movieId
  );

  if (score !== null) return score;

  const actualScore = await redisClient.zscore(
    `User-Actual-Watchlist-Movies:${userId}`,
    movieId
  );

  if (actualScore !== null) return actualScore;

  return null;
};

export const getUserWatchlistMoviesFromRedis = async (userId, page, limit) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const skip = (page - 1) * limit; // Calculate starting index
  const to = skip + limit - 1; // Calculate ending index

  const movieIds = await redisClient.zrevrange(
    `User-Actual-Watchlist-Movies:${userId}`,
    skip,
    to
  );

  console.log("movieIds", movieIds);

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
    const newDate = new Date(movie.created_at);
    const createdAt = newDate.getTime();

    multi.zadd(`User-Actual-Watchlist-Movies:${userId}`, createdAt, movie.id);

    multi.zadd(`User-Watchlist-Movies:${userId}`, createdAt, movie.id);

    multi.set(`Movie:${movie.id}`, JSON.stringify(movie), "EX", 3600);
  }

  multi.expire(`User-Actual-Watchlist-Movies:${userId}`, 3600);
  multi.expire(`User-Watchlist-Movies:${userId}`, 3600);

  await multi.exec();
};

export const setSingleUserWatchlistMovieIntoRedis = async (userId, movie) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !movie) return;

  const newDate = new Date(movie.created_at);
  const createdAt = newDate.getTime();

  await redisClient.zadd(
    `User-Watchlist-Movies:${userId}`,
    createdAt,
    movie.id
  );

  const isAlreadyPresent = await redisClient.exists(
    `User-Actual-Watchlist-Movies:${userId}`
  );

  if (!isAlreadyPresent) return;

  await redisClient.zadd(
    `User-Actual-Watchlist-Movies:${userId}`,
    createdAt,
    movie.id
  );
};

export const deleteSingleUserWatchlistMovieFromRedis = async (
  userId,
  movieId
) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !movieId) return;

  const multi = redisClient.multi();

  multi.zrem(`User-Watchlist-Movies:${userId}`, movieId);

  multi.zrem(`User-Actual-Watchlist-Movies:${userId}`, movieId);

  await multi.exec();
};
