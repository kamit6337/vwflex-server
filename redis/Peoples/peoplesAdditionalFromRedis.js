import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getPersonTvShowsFromRedis = async (personId) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  let get = await redisClient.get(`Person-TvShows:${personId}`);
  if (!get) {
    return null;
  }

  const tvIds = JSON.parse(get);

  if (!tvIds || tvIds.length === 0) {
    return null;
  }

  const promises = tvIds.map((id) => redisClient.get(`Tv:${id}`));
  const getTvShows = await Promise.all(promises);
  const isMissing = getTvShows.some((data) => !data);
  if (isMissing) {
    return null;
  }

  return getTvShows.map((data) => JSON.parse(data));
};

export const setPersonTvShowsToRedis = async (personId, TvShows) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  if (!personId || !TvShows || TvShows.length === 0) return;

  const tvIds = TvShows.map((tv) => tv.id);

  await redisClient.set(
    `Person-TvShows:${personId}`,
    JSON.stringify(tvIds),
    "EX",
    3600
  );

  const promises = TvShows.map((data) =>
    redisClient.set(`Tv:${data.id}`, JSON.stringify(data), "EX", 3600)
  );

  await Promise.all(promises);
};

export const getPersonMoviesFromRedis = async (personId) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  let get = await redisClient.get(`Person-Movies:${personId}`);
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

export const setPersonMovieToRedis = async (personId, movies) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  if (!personId || !movies || movies.length === 0) return;

  const movieIds = movies.map((movie) => movie.id);

  await redisClient.set(
    `Person-Movies:${personId}`,
    JSON.stringify(movieIds),
    "EX",
    3600
  );

  const promises = movies.map((movie) =>
    redisClient.set(`Movie:${movie.id}`, JSON.stringify(movie), "EX", 3600)
  );

  await Promise.all(promises);
};

export const personImagesFromRedis = async (id) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  const get = await redisClient.get(`Person-Images:${id}`);
  return get ? JSON.parse(get) : null;
};

export const setPersonImagesToRedis = async (id, data) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  if (!id || !data) return;

  await redisClient.set(
    `Person-Images:${id}`,
    JSON.stringify(data),
    "EX",
    3600
  );
};
