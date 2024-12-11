import WatchlistMovie from "../../models/WatchlistMovieModel.js";
import { deleteSingleUserWatchlistMovieFromRedis } from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const deleteUserWatchlistMovie = async (userId, movieId) => {
  if (!userId || !movieId) {
    throw new Error("UserId or MovieId is not provided");
  }

  await WatchlistMovie.deleteOne({
    user: userId,
    id: movieId,
  });

  await deleteSingleUserWatchlistMovieFromRedis(userId, movieId);

  return false;
};

export default deleteUserWatchlistMovie;
