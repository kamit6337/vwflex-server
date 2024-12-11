import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getTvShowPresentInUserWatchlist = async (userId, tvId, season) => {
  const check = checkRedisConnection();
  if (!check) return null;
  const get = await redisClient.get(`User-Watchlist-TvShows:${userId}`);

  if (!get) {
    return null;
  }

  const arr = JSON.parse(get);

  if (!arr || arr.length === 0) {
    return null;
  }

  const findTvShow = arr.find(
    (obj) => obj.id === tvId && obj.season === season
  );
  return !!findTvShow;
};

export const getUserWatchlistTvShowsFromRedis = async (userId) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const get = await redisClient.get(`User-Watchlist-TvShows:${userId}`);

  if (!get) {
    return null;
  }

  const arr = JSON.parse(get);

  if (!arr || arr.length === 0) {
    return null;
  }

  const promises = arr.map((obj) =>
    redisClient.get(`TV-Shows-Season:${obj.id}:${obj.season}`)
  );

  const getTvShows = await Promise.all(promises);
  const isMissing = getTvShows.some((data) => !data);
  if (isMissing) {
    return null;
  }

  return getTvShows.map((data) => JSON.parse(data));
};

export const setUserWatchlistTvShowsIntoRedis = async (userId, tvShows) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !tvShows || tvShows.length === 0) return;

  const multi = redisClient.multi();

  for (const tvShow of tvShows) {
    const obj = {
      id: tvShow.id,
      season: tvShow.season,
    };

    const getTvShows = multi.get(`User-Watchlist-TvShows:${userId}`);

    let updatedTvShows;

    if (getTvShows) {
      updatedTvShows = [obj, ...JSON.parse(getTvShows)];
    } else {
      updatedTvShows = [obj];
    }

    multi.set(`User-Watchlist-TvShows:${userId}`, updatedTvShows, "EX", 3600);

    multi.get(
      `TV-Shows-Season:${tvShow.id}:${tvShow.season}`,
      JSON.stringify(tvShow)
    );
  }

  multi.expire(`User-Watchlist-TvShows:${userId}`, 3600);
  await multi.exec();
};

export const setSingleUserWatchlistTvShowIntoRedis = async (
  userId,
  tvId,
  season
) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !tvId || !season) return;

  const getTvShows = await redisClient.get(`User-Watchlist-TvShows:${userId}`);

  const obj = {
    id: tvId,
    season: season,
  };

  let updatedTvShows;

  if (getTvShows) {
    updatedTvShows = [obj, ...JSON.parse(getTvShows)];
  } else {
    updatedTvShows = [obj];
  }

  await redisClient.set(
    `User-Watchlist-TvShows:${userId}`,
    updatedTvShows,
    "EX",
    3600
  );
};

export const deleteSingleUserWatchlistTvShowFromRedis = async (
  userId,
  tvId,
  season
) => {
  if (!userId || !tvId || !season) return;

  const getTvShows = await redisClient.get(`User-Watchlist-TvShows:${userId}`);

  if (!getTvShows) {
    return null;
  }

  const arr = JSON.parse(getTvShows);

  if (!arr || arr.length === 0) {
    return null;
  }

  const updatedTvShows = arr.filter(
    (tvShow) => tvShow.id !== tvId && tvShow.season !== season
  );

  await redisClient.set(
    `User-Watchlist-TvShows:${userId}`,
    updatedTvShows,
    "EX",
    3600
  );
};
