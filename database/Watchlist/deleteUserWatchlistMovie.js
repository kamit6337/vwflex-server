import supabaseClient from "../../lib/supabaseClient.js";
import { deleteSingleUserWatchlistMovieFromRedis } from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const deleteUserWatchlistMovie = async (userId, movieId) => {
  if (!userId || !movieId) {
    throw new Error("UserId or MovieId is not provided");
  }

  const { error } = await supabaseClient
    .from("watchlist_movies")
    .delete()
    .eq("user", userId)
    .eq("id", movieId);

  if (error) {
    throw new Error(error);
  }

  await deleteSingleUserWatchlistMovieFromRedis(userId, movieId);

  return false;
};

export default deleteUserWatchlistMovie;
