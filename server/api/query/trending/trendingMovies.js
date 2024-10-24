import {
  getTrendingMoviesFromRedis,
  setTrendingMoviesIntoRedis,
} from "../../../redis/Trending/trendingMoviesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const DAY = "day";
const WEEK = "week";

const trendingMovies = async (time = DAY) => {
  const get = await getTrendingMoviesFromRedis(time);
  if (get) {
    return get;
  }

  if (time === WEEK) {
    const trendingMovies = await getReq(`/trending/movie/${WEEK}`);
    const response = trendingMovies?.results;

    await setTrendingMoviesIntoRedis(time, response);
    return response;
  }

  const trendingMovies = await getReq(`/trending/movie/${DAY}`);
  const response = trendingMovies?.results;

  await setTrendingMoviesIntoRedis(time, response);
  return response;
};

export default trendingMovies;
