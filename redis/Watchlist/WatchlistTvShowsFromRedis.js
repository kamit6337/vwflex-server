import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getTvShowPresentInUserWatchlist = async (userId, tvId, season) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const score = await redisClient.zscore(
    `User-Watchlist-TvShows:${userId}`,
    `${tvId}-${season}`
  );

  if (score !== null) return score;

  const actualScore = await redisClient.zscore(
    `User-Actual-Watchlist-TvShows:${userId}`,
    `${tvId}-${season}`
  );

  if (actualScore !== null) return actualScore;

  return null;
};

export const getUserWatchlistTvShowsFromRedis = async (userId, page, limit) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const skip = (page - 1) * limit; // Calculate starting index
  const to = skip + limit - 1; // Calculate ending index

  const tvIds = await redisClient.zrevrange(
    `User-Actual-Watchlist-TvShows:${userId}`,
    skip,
    to
  );

  console.log("tvIds", tvIds);

  if (!tvIds || tvIds.length === 0) return null;

  const promises = tvIds.map((str) => {
    const id = str.split("-")[0];
    const season = str.split("-")[1];
    return redisClient.get(`TV-Shows-Season:${id}:${season}`);
  });

  const getTvShows = await Promise.all(promises);
  const isMissingMovie = getTvShows.some((movie) => !movie);
  if (isMissingMovie) {
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
    const { id: tvId, season, created_at } = tvShow;

    const newDate = new Date(created_at);
    const createdAt = newDate.getTime();

    multi.zadd(
      `User-Actual-Watchlist-TvShows:${userId}`,
      createdAt,
      `${tvId}-${season}`
    );

    multi.zadd(
      `User-Watchlist-TvShows:${userId}`,
      createdAt,
      `${tvId}-${season}`
    );

    multi.set(
      `TV-Shows-Season:${tvId}:${season}`,
      JSON.stringify(tvShow),
      "EX",
      3600
    );
  }

  multi.expire(`User-Actual-Watchlist-TvShows:${userId}`, 3600);
  multi.expire(`User-Watchlist-TvShows:${userId}`, 3600);

  await multi.exec();
};

export const setSingleUserWatchlistTvShowIntoRedis = async (userId, tvShow) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !tvShow) return;

  const { id: tvId, season, created_at } = tvShow;

  const newDate = new Date(created_at);
  const createdAt = newDate.getTime();

  await redisClient.zadd(
    `User-Watchlist-TvShows:${userId}`,
    createdAt,
    `${tvId}-${season}`
  );

  await redisClient.expire(`User-Watchlist-TvShows:${userId}`, 3600);

  const isAlreadyPresent = await redisClient.exists(
    `User-Actual-Watchlist-TvShows:${userId}`
  );

  if (!isAlreadyPresent) return;

  await redisClient.zadd(
    `User-Actual-Watchlist-TvShows:${userId}`,
    createdAt,
    `${tvId}-${season}`
  );

  await redisClient.expire(`User-Actual-Watchlist-TvShows:${userId}`, 3600);
};

export const deleteSingleUserWatchlistTvShowFromRedis = async (
  userId,
  tvId,
  season
) => {
  const check = checkRedisConnection();

  if (!check) return null;

  if (!userId || !tvId || !season) return;

  const multi = redisClient.multi();

  multi.zrem(`User-Watchlist-TvShows:${userId}`, `${tvId}-${season}`);

  multi.zrem(`User-Actual-Watchlist-TvShows:${userId}`, `${tvId}-${season}`);

  await multi.exec();
};
