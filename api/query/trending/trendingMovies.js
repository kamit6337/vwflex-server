import {
  getTrendingMoviesFromRedis,
  setTrendingMoviesIntoRedis,
} from "../../../redis/Trending/trendingMoviesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const DAY = "DAY";
const WEEK = "WEEK";

const trendingMovies = async (time = DAY) => {
  const get = await getTrendingMoviesFromRedis(time);
  if (get) {
    return get;
  }

  if (time === WEEK) {
    const trendingMovies = await getReq(`/trending/movie/week`);
    const response = trendingMovies?.results;

    await setTrendingMoviesIntoRedis(time, response);
    return response;
  }

  const trendingMovies = await getReq(`/trending/movie/day`);
  const response = trendingMovies?.results;

  await setTrendingMoviesIntoRedis(time, response);
  return response;
};

export default trendingMovies;
