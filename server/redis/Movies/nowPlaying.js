import redisClient from "../redisClient.js";

export const getNowPlayingFromRedis = async (page, limit = 20) => {
  const skip = (page - 1) * limit;

  const movieIds = await redisClient.zrevrange(
    "Now_Playing",
    skip,
    skip + limit - 1
  );

  const promises = movieIds.map((id) => redisClient.get(`Movie:${id}`));
  const getMovies = await Promise.all(promises);
  const isMissingMovie = getMovies.some((movie) => !movie);
  if (isMissingMovie) {
    return null;
  }

  return getMovies.map((movie) => JSON.parse(movie));
};

export const setNowPlayingToRedis = async (movies) => {
  if (!movies || movies.length === 0) return;

  const multi = redisClient.multi();

  for (const movie of movies) {
    const currentTime = Date.now();

    multi.zadd("Now_Playing", currentTime, movie.id);

    multi.set(`Movie:${movie.id}`, JSON.stringify(movie), "EX", 3600);
  }
  multi.expire("Now_Playing", 3600);

  await multi.exec();
};
