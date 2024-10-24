import fetchMovieDetail from "../../api/query/movie/fetchMovieDetail.js";
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

  const movie = await fetchMovieDetail(movieId);

  await setSingleUserWatchlistMovieIntoRedis(userId, movie);

  return movie;
};

export default postMovieIntoWatchlist;
