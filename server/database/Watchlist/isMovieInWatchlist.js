import WatchlistMovie from "../../models/WatchlistMovieModel.js";
import {
  getMoviePresentInUserWatchlist,
  setSingleUserWatchlistMovieIntoRedis,
} from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const isMovieInWatchlist = async (userId, movieId) => {
  const get = await getMoviePresentInUserWatchlist(userId, movieId);

  if (get) {
    return true;
  }

  const findMovie = await WatchlistMovie.exists({
    user: userId,
    id: Number(movieId),
  });

  if (!!findMovie) {
    await setSingleUserWatchlistMovieIntoRedis(userId, movieId);
  }

  return !!findMovie;
};

export default isMovieInWatchlist;
