import { getTvFromRedis, setTvToRedis } from "../functions/setAndGetTvShows.js";

const AIRING_TODAY = "Airing-Today";
const ON_THE_LIST = "On-The-List";
const POPULAR = "Popular-Tv-Shows";
const TOP_RATED_TVSHOWS = "Top-Rated-TV-Shows";

export const getAiringTodayTvShowsFromRedis = async (page, limit = 20) => {
  return getTvFromRedis(AIRING_TODAY, page, limit);
};

export const setAiringTodayTvShowsToRedis = async (movies) => {
  await setTvToRedis(AIRING_TODAY, movies);
};

export const getOnTheListShowsFromRedis = async (page, limit = 20) => {
  return getTvFromRedis(ON_THE_LIST, page, limit);
};

export const setOnTheListShowsToRedis = async (movies) => {
  await setTvToRedis(ON_THE_LIST, movies);
};

export const getPopularTvShowsFromRedis = async (page, limit = 20) => {
  return getTvFromRedis(POPULAR, page, limit);
};

export const setPopularTvShowsToRedis = async (movies) => {
  await setTvToRedis(POPULAR, movies);
};

export const getTopRatedTvShowsFromRedis = async (page, limit = 20) => {
  return getTvFromRedis(TOP_RATED_TVSHOWS, page, limit);
};

export const setTopRatedTvShowsToRedis = async (movies) => {
  await setTvToRedis(TOP_RATED_TVSHOWS, movies);
};
