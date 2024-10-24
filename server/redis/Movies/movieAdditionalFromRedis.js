import checkRedisConnection from "../checkRedisConnection";
import {
  getMovieFromRedis,
  setMovieToRedis,
} from "../functions/setAndGetMovies";
import redisClient from "../redisClient";

const RECOMMENDATION = "Recommended-Movies";
const SIMILAR = "Similar-Movies";

export const getMovieRecommendations = async (movieId, page, limit = 20) => {
  return getMovieFromRedis(`${RECOMMENDATION}:${movieId}`, page, limit);
};

export const setMovieRecommendations = async (movieId, movies) => {
  await setMovieToRedis(`${RECOMMENDATION}:${movieId}`, movies);
};

export const getMovieSimilar = async (movieId, page, limit = 20) => {
  return getMovieFromRedis(`${SIMILAR}:${movieId}`, page, limit);
};

export const setMovieSimilar = async (movieId, movies) => {
  await setMovieToRedis(`${SIMILAR}:${movieId}`, movies);
};

export const getMovieImagesFromRedis = async (movieId) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const get = await redisClient.get(`Movie-Images:${movieId}`);
  return get ? JSON.parse(get) : null;
};

export const setMovieImagesToRedis = async (movieId, data) => {
  const check = checkRedisConnection();
  if (!check) return null;

  if (!movieId || !data) return;

  await redisClient.set(`Movie-Images:${movieId}`, JSON.stringify(data), "EX", 3600);
};

export const getMovieReviewsFromRedis = async (movieId) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const get = await redisClient.get(`Movie-Reviews:${movieId}`);
  return get ? JSON.parse(get) : null;
};

export const setMovieReviewsToRedis = async (movieId, data) => {
  const check = checkRedisConnection();
  if (!check) return null;

  if (!movieId || !data) return;

  await redisClient.set(`Movie-Reviews:${movieId}`, JSON.stringify(data), "EX", 3600);
};
