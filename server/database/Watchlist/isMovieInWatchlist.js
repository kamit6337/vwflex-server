import WatchlistMovie from "../../models/WatchlistMovieModel.js";
import { getMoviePresentInUserWatchlist } from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const isMovieInWatchlist = async (userId, movieId) => {
  const get = await getMoviePresentInUserWatchlist(userId, movieId);

  if (get) {
    return get;
  }

  const findMovie = await WatchlistMovie.exists({
    user: userId,
    id: Number(movieId),
  });

  return !!findMovie;
};

export default isMovieInWatchlist;
