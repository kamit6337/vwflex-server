import checkRedisConnection from "../checkRedisConnection.js";
import redisClient from "../redisClient.js";

export const getTvFromRedis = async (uniqueName, page, limit) => {
  const check = checkRedisConnection();
  if (!check) return null;

  const skip = (page - 1) * limit;

  const TvIds = await redisClient.zrange(uniqueName, skip, skip + limit - 1);

  if (!TvIds || TvIds.length === 0) {
    return null;
  }

  const promises = TvIds.map((id) => redisClient.get(`Tv:${id}`));
  const getTvs = await Promise.all(promises);
  const isMissingTv = getTvs.some((Tv) => !Tv);
  if (isMissingTv) {
    return null;
  }

  return getTvs.map((Tv) => JSON.parse(Tv));
};

export const setTvToRedis = async (uniqueName, TvShows) => {
  const check = checkRedisConnection();
  if (!check) return null;

  if (!TvShows || TvShows.length === 0) return;

  const multi = redisClient.multi();

  const baseTime = Date.now();

  TvShows.forEach((Tv, index) => {
    const updatedTime = baseTime + index;

    multi.zadd(uniqueName, updatedTime, Tv.id);
    multi.set(`Tv:${Tv.id}`, JSON.stringify(Tv), "EX", 3600);
  });

  multi.expire(uniqueName, 3600);

  await multi.exec();
};
