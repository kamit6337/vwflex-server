import {
  getTrendingTvShowsFromRedis,
  setTrendingTvShowsIntoRedis,
} from "../../../redis/Trending/trendingTvShowsFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const DAY = "day";
const WEEK = "week";

const trendingTvShows = async (time = DAY) => {
  const get = await getTrendingTvShowsFromRedis(time);
  if (get) {
    return get;
  }

  if (time === WEEK) {
    const trendingtv = await getReq(`/trending/tv/${WEEK}`);
    const response = trendingtv?.results;

    await setTrendingTvShowsIntoRedis(time, response);

    return response;
  }

  const trendingtv = await getReq(`/trending/tv/${DAY}`);
  const response = trendingtv?.results;

  await setTrendingTvShowsIntoRedis(time, response);

  return response;
};

export default trendingTvShows;
