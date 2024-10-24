import WatchlistMovie from "../../models/WatchlistMovieModel.js";
import { deleteSingleUserWatchlistMovieFromRedis } from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const deleteUserWatchlisMovie = async (userId, movieId) => {
  if (!userId || !movieId) {
    throw new Error("UserId or MovieId is not provided");
  }

  await WatchlistMovie.deleteOne({
    user: userId,
    id: movieId,
  });

  await deleteSingleUserWatchlistMovieFromRedis(userid, movieId);

  return "Movie remove from Watchlist Successfully";
};

export default deleteUserWatchlisMovie;
