import checkRedisConnection from "../checkRedisConnection.js";
import { getTvFromRedis, setTvToRedis } from "../functions/setAndGetTvShows.js";
import redisClient from "../redisClient.js";

const RECOMMENDATION = "Recommended-Tv-Shows";
const SIMILAR = "Similar-Tv-Shows";

export const getTvShowRecommendations = async (tvId, page, limit = 20) => {
  return getTvFromRedis(`${RECOMMENDATION}:${tvId}`, page, limit);
};

export const setTvShowRecommendations = async (tvId, TvShows) => {
  await setTvToRedis(`${RECOMMENDATION}:${tvId}`, TvShows);
};

export const getTvShowSimilar = async (tvId, page, limit = 20) => {
  return getTvFromRedis(`${SIMILAR}:${tvId}`, page, limit);
};

export const setTvShowSimilar = async (tvId, TvShows) => {
  await setTvToRedis(`${SIMILAR}:${tvId}`, TvShows);
};

export const getTvShowSeasonFromRedis = async (tvId, season) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }
  const get = await redisClient.get(`TV-Shows-Season:${tvId}:${season}`);
  return get ? JSON.parse(get) : null;
};

export const setTvShowSeasonIntoRedis = async (tvId, season, data) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  if (!tvId || !season || !data) return;

  await redisClient.set(
    `TV-Shows-Season:${tvId}:${season}`,
    JSON.stringify(data),
    "EX",
    3600
  );
};

export const getTvShowsReviewsFromRedis = async (tvId) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const get = await redisClient.get(`TV-Shows-Reviews:${tvId}`);
  return get ? JSON.parse(get) : null;
};

export const setTvShowsReviewsToRedis = async (tvId, data) => {
  const check = checkRedisConnection();
  if (!check) return null;

  if (!tvId || !data) return;

  await redisClient.set(
    `TV-Shows-Reviews:${tvId}`,
    JSON.stringify(data),
    "EX",
    3600
  );
};

export const getTvShowsImagesFromRedis = async (tvId) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const get = await redisClient.get(`TV-Shows-Images:${tvId}`);
  return get ? JSON.parse(get) : null;
};

export const setTvShowsImagesToRedis = async (tvId, data) => {
  const check = checkRedisConnection();
  if (!check) return null;

  if (!tvId || !data) return;

  await redisClient.set(
    `TV-Shows-Images:${tvId}`,
    JSON.stringify(data),
    "EX",
    3600
  );
};
