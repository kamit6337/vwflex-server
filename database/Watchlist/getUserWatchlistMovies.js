import fetchMovieDetail from "../../api/query/movie/fetchMovieDetail.js";
import WatchlistMovie from "../../models/WatchlistMovieModel.js";
import {
  getUserWatchlistMoviesFromRedis,
  setUserWatchlistMoviesIntoRedis,
} from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const getUserWatchlistMovies = async (userId) => {
  if (!userId) {
    throw new Error("UserId is not provided");
  }

  const get = await getUserWatchlistMoviesFromRedis(userId);

  if (get) {
    return get;
  }

  const movies = await WatchlistMovie.find({
    user: userId,
  })
    .lean()
    .sort("-createdAt");

  const response = JSON.parse(JSON.stringify(movies));

  if (response.length === 0) {
    return response;
  }

  const movieIds = response.map((movie) => movie.id);

  const promises = movieIds.map((movieId) => fetchMovieDetail(movieId));

  const movieDetails = await Promise.all(promises);

  await setUserWatchlistMoviesIntoRedis(userId, movieDetails);

  return movieDetails;
};

export default getUserWatchlistMovies;
