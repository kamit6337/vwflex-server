import WatchlistMovie from "../../models/WatchlistMovieModel.js";
import { setSingleUserWatchlistMovieIntoRedis } from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const postMovieIntoWatchlist = async (userId, movieId) => {
  if (!userId || !movieId) {
    throw new Error("UserId or MovieId is not provided");
  }

  await WatchlistMovie.create({
    user: userId,
    id: movieId,
  });

  await setSingleUserWatchlistMovieIntoRedis(userId, movieId);

  return true;
};

export default postMovieIntoWatchlist;
