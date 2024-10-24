import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getTrendingTvShowsFromRedis = async (time) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  const get = await redisClient.get(`Trending-TvShows:${time}`);

  if (!get) {
    return null;
  }

  const tvIds = JSON.parse(get);

  if (!tvIds || tvIds.length === 0) return null;

  const promises = tvIds.map((id) => redisClient.get(`Tv:${id}`));
  const getTvShows = await Promise.all(promises);
  const isMissing = getTvShows.some((data) => !data);
  if (isMissing) {
    return null;
  }
  return getTvShows.map((data) => JSON.parse(data));
};

export const setTrendingTvShowsIntoRedis = async (time, TvShows) => {
  const check = checkRedisConnection();
  if (!check) {
    return null;
  }

  if (!personId || !TvShows || TvShows.length === 0) return;

  const tvIds = TvShows.map((tv) => tv.id);

  await redisClient.set(
    `Trending-TvShows:${time}`,
    JSON.stringify(tvIds),
    "EX",
    3600
  );

  const promises = TvShows.map((data) =>
    redisClient.set(`Tv:${data.id}`, JSON.stringify(data), "EX", 3600)
  );

  await Promise.all(promises);
};
