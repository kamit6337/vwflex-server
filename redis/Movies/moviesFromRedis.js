import {
  getMovieFromRedis,
  setMovieToRedis,
} from "../functions/setAndGetMovies.js";

const NOW_PLAYING = "Now_Playing-Movies";
const POPULAR = "Popular-Movies";
const TOP_RATED = "Top-Rated-Movies";
const UPCOMING = "Upcoming-Movies";

export const getNowPlayingFromRedis = async (page, limit = 20) => {
  return getMovieFromRedis(NOW_PLAYING, page, limit);
};

export const setNowPlayingToRedis = async (movies) => {
  await setMovieToRedis(NOW_PLAYING, movies);
};

export const getPopularFromRedis = async (page, limit = 20) => {
  return getMovieFromRedis(POPULAR, page, limit);
};

export const setPopularToRedis = async (movies) => {
  await setMovieToRedis(POPULAR, movies);
};

export const getTopRatedFromRedis = async (page, limit = 20) => {
  return getMovieFromRedis(TOP_RATED, page, limit);
};

export const setTopRatedToRedis = async (movies) => {
  await setMovieToRedis(TOP_RATED, movies);
};

export const getUpcomingFromRedis = async (page, limit = 20) => {
  return getMovieFromRedis(UPCOMING, page, limit);
};

export const setUpcomingToRedis = async (movies) => {
  await setMovieToRedis(UPCOMING, movies);
};
