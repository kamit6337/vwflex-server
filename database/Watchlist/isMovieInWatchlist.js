import supabaseClient from "../../lib/supabaseClient.js";
import {
  getMoviePresentInUserWatchlist,
  setSingleUserWatchlistMovieIntoRedis,
} from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const isMovieInWatchlist = async (userId, movieId) => {
  const get = await getMoviePresentInUserWatchlist(userId, movieId);

  if (get) {
    return true;
  }

  const { count, error } = await supabaseClient
    .from("watchlist_movies")
    .select("*", { count: "exact", head: true })
    .eq("user", userId)
    .eq("id", movieId);

  if (error) {
    throw new Error(error);
  }

  const bool = count > 0;

  if (bool) {
    await setSingleUserWatchlistMovieIntoRedis(userId, movieId);
  }

  return bool;
};

export default isMovieInWatchlist;
